import { NextResponse } from "next/server";

interface GuestUser {
  id: string;
  email: string;
  name: string;
}

export async function POST() {
  try {
    // Simulate guest user data or perform actual guest session creation
    const guestUser: GuestUser = {
      id: "guest",
      email: "guest@example.com",
      name: "Guest User",
    };

    // Return the guest user as a JSON response
    return NextResponse.json(
      { user: guestUser },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Guest login error:", error);

    // Properly handle the error and return a response with a 500 status code
    return NextResponse.json(
      { error: "Failed to log in as guest" },
      { status: 500 }
    );
  }
}
