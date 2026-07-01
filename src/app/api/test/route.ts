import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Test exposed route");
  return NextResponse.json({ test: "hello world" }, { status: 200 });
}
