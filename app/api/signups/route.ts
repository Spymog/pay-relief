import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      signup_type,
      full_name,
      certification,
      specializations,
      experience,
      reason_for_joining,
    } = body;

    // Validate required fields
    if (!email || !signup_type) {
      return NextResponse.json(
        { error: "Email and signup_type are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate signup_type
    const validTypes = ["debtor", "counselor", "lender"];
    if (!validTypes.includes(signup_type)) {
      return NextResponse.json(
        { error: "Invalid signup_type" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const { data: existingSignup } = await supabase
      .from("signups")
      .select("email")
      .eq("email", email)
      .single();

    if (existingSignup) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 },
      );
    }

    // Insert the signup
    const { data, error } = await supabase
      .from("signups")
      .insert([
        {
          email,
          signup_type,
          full_name: full_name || null,
          certification: certification || null,
          specializations: specializations || null,
          experience: experience || null,
          reason_for_joining: reason_for_joining || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save signup" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
