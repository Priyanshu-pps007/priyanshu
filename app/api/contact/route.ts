import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { saveContactSubmission } from "@/lib/db";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  };

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const company = body.company?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || headerStore.get("x-real-ip") || "";
  const userAgent = headerStore.get("user-agent") || "";

  saveContactSubmission({
    name,
    email,
    company,
    message,
    ipAddress,
    userAgent,
  });

  return NextResponse.json({
    message: "Message sent successfully. Priyanshu will contact you soon.",
  });
}
