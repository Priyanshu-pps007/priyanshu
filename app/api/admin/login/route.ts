import { NextResponse } from "next/server";

import { createLoginSession, validateAdminCredentials } from "@/lib/auth";

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

  const user = validateAdminCredentials(email, password);

  if (!user) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  await createLoginSession(user.id);

  return NextResponse.json({ message: "Authenticated" });
}
