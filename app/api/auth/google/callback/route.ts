import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OAuth2Client } from "google-auth-library";
import { gmail } from "@googleapis/gmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Same client config as the initiation route — used here for token exchange
const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

function makeRawEmail(
  to: string[],
  from: string,
  subject: string,
  body: string,
): string {
  const email = [
    `From: ${from}`,
    `To: ${to.join(", ")}`,
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

  // User denied access
  if (error || !code || !nonce) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=access_denied`,
    );
  }

  // Look up the nonce in Supabase to retrieve form data
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

  // Delete the row immediately — it's single-use
  await supabase.from("oauth_state").delete().eq("nonce", nonce);

  // Reject if expired
  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=invalid_state`,
    );
  }

  // Exchange the authorization code for tokens — replaces the manual fetch to oauth2.googleapis.com/token
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

  // Attach the tokens to the client — subsequent API calls are automatically authorized
  oauth2Client.setCredentials(tokens);

  // Instantiate the typed Gmail client, authorized via the OAuth2 client
  const gmailClient = gmail({ version: "v1", auth: oauth2Client });

  // Fetch the user's Gmail address — replaces the manual fetch to /gmail/v1/users/me/profile
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

  // Build the RFC 2822 message and send — replaces the manual fetch to /gmail/v1/users/me/messages/send
  try {
    const raw = makeRawEmail(
      data.to_email,
      emailAddress,
      data.subject,
      data.body,
    );
    await gmailClient.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
  } catch (err) {
    console.error("Gmail send failed:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=send_failed`,
    );
  }

  // Revoke the token immediately after sending — app no longer has any Gmail access
  try {
    await oauth2Client.revokeToken(tokens.access_token!);
  } catch (err) {
    // Non-fatal — log it but don't block the success redirect.
    // The token will expire naturally on its own regardless.
    console.error("Token revocation failed:", err);
  }

  const sentFrom = encodeURIComponent(emailAddress);
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}?success=true&from=${sentFrom}`,
  );
}
