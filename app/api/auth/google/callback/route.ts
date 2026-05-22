import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OAuth2Client } from "google-auth-library";
import { gmail } from "@googleapis/gmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

function makeRawEmail(
  to: string,
  from: string,
  subject: string,
  body: string,
): string {
  const email = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    ``,
    body,
  ].join("\r\n");

  return Buffer.from(email).toString("base64url");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const nonce = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !nonce) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=access_denied`,
    );
  }

  const { data, error: dbError } = await supabase
    .from("oauth_state")
    .select("to_email, subject, body, expires_at")
    .eq("nonce", nonce)
    .single();

  if (dbError || !data) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=invalid_state`,
    );
  }

  // Delete immediately — single-use
  await supabase.from("oauth_state").delete().eq("nonce", nonce);

  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=invalid_state`,
    );
  }

  let tokens;
  try {
    const { tokens: exchanged } = await oauth2Client.getToken(code);
    tokens = exchanged;
  } catch (err: any) {
    console.error("Token exchange failed:", err?.response?.data ?? err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?error=token_exchange_failed`,
    );
  }

  oauth2Client.setCredentials(tokens);
  const gmailClient = gmail({ version: "v1", auth: oauth2Client });

  let emailAddress: string;
  try {
    const ticket = await oauth2Client.getTokenInfo(tokens.access_token!);
    emailAddress = ticket.email!;
  } catch (err) {
    console.error("Profile fetch failed:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=profile_fetch_failed`,
    );
  }

  // Send one individual copy per recipient so each person only sees their own
  // address in the To field — no recipient is exposed to the others.
  const recipients: string[] = data.to_email;
  const failed: string[] = [];

  for (const recipient of recipients) {
    try {
      const raw = makeRawEmail(
        recipient,
        emailAddress,
        data.subject,
        data.body,
      );
      await gmailClient.users.messages.send({
        userId: "me",
        requestBody: { raw },
      });
    } catch (err) {
      // Collect failures rather than bailing out mid-loop — partial delivery
      // is better than stopping after the first failure.
      console.error(`Gmail send failed for ${recipient}:`, err);
      failed.push(recipient);
    }
  }

  // Revoke the token — app no longer needs any Gmail access
  try {
    await oauth2Client.revokeToken(tokens.access_token!);
  } catch (err) {
    console.error("Token revocation failed:", err);
  }

  if (failed.length === recipients.length) {
    // Every send failed — treat as a full failure
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=send_failed`,
    );
  }

  const sentFrom = encodeURIComponent(emailAddress);
  const params = new URLSearchParams({ success: "true", from: sentFrom });
  if (failed.length > 0) {
    // Partial failure — surface how many sends succeeded so the UI can inform the user
    params.set("sent", String(recipients.length - failed.length));
    params.set("failed", String(failed.length));
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}?${params.toString()}`,
  );
}
