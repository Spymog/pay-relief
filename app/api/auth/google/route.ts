import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OAuth2Client } from "google-auth-library";
import { randomBytes } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Instantiate the OAuth2 client once — it's stateless here, just used to generate the URL
const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export async function POST(req: NextRequest) {
  const { to, subject, body } = await req.json();

  // Basic server-side validation
  if (!to || !subject || !body) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json(
      { error: "Invalid recipient email." },
      { status: 400 },
    );
  }

  // Generate a cryptographically random nonce — this is all that goes in the URL
  const nonce = randomBytes(32).toString("hex");

  // Store form data server-side, expires in 10 minutes
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error } = await supabase.from("oauth_state").insert({
    nonce,
    to_email: to,
    subject,
    body,
    expires_at: expiresAt,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to initiate OAuth flow." },
      { status: 500 },
    );
  }

  // generateAuthUrl builds the correct Google OAuth URL — no manual URLSearchParams needed
  const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: "online", // No refresh token — one-time only
    scope: ["https://www.googleapis.com/auth/gmail.send", "email"],
    prompt: "consent", // Always show consent screen
    state: nonce, // Only the nonce goes in the URL — no form data
  });

  return NextResponse.json({ redirectUrl });
}
