import { NextResponse } from "next/server";

import { authenticateAdmin, createLoginSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    const session = await authenticateAdmin(email, password);
    await createLoginSession(session.session_token, session.expires_at);

    return NextResponse.json({ message: "Authenticated" });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid admin credentials." },
      { status: 401 }
    );
  }
}
