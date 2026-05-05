import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import {
  createAdminSession,
  deleteExpiredSessions,
  deleteSession,
  findAdminUserByEmail,
  findSession,
} from "@/lib/db";

const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64);
}

export function validateAdminCredentials(email: string, password: string) {
  const user = findAdminUserByEmail(email);

  if (!user) {
    return null;
  }

  const incoming = hashPassword(password, user.password_salt);
  const saved = Buffer.from(user.password_hash, "hex");

  if (incoming.length !== saved.length || !timingSafeEqual(incoming, saved)) {
    return null;
  }

  return user;
}

export async function createLoginSession(userId: number) {
  deleteExpiredSessions();

  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  createAdminSession(userId, sessionToken, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearLoginSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    deleteSession(sessionToken);
  }

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getAuthenticatedAdmin() {
  deleteExpiredSessions();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = findSession(sessionToken);

  if (!session) {
    return null;
  }

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    deleteSession(sessionToken);
    return null;
  }

  return {
    id: session.user_id,
    email: session.email,
  };
}
