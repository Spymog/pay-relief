import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid-client";

export async function POST(request: NextRequest) {
  try {
    const { public_token } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: "public_token is required" },
        { status: 400 },
      );
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    console.log("Exchange response:\n", response.data);
    console.log("Access token:\n", response.data.access_token);
    console.log("Item ID:\n", response.data.item_id);

    const { access_token, item_id } = response.data;

    // TODO: securely store access_token and item_id in your database
    // associated with the current user — never expose access_token to the client

    return NextResponse.json({ item_id });
  } catch (error) {
    console.error("Error exchanging public token:\n", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 },
    );
  }
}
