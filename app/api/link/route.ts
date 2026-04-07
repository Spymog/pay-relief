import { NextRequest, NextResponse } from "next/server";
import { Products, CountryCode } from "plaid";
import { plaidClient } from "@/lib/plaid-client";

export async function POST(request: NextRequest) {
  try {
    // const user = await User.find(...)
    // const clientUserId = user.id

    const linkTokenRequest = {
      user: {
        client_user_id: "test-user-id",
        // client_user_id: clientUserId,
      },
      client_name: "Plaid Test App",
      products: [Products.Auth],
      language: "en",
      country_codes: [CountryCode.Us],
    };

    const createTokenResponse =
      await plaidClient.linkTokenCreate(linkTokenRequest);
    return NextResponse.json(createTokenResponse.data);
  } catch (error) {
    console.error("Plaid error:", error);
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 },
    );
  }
}
