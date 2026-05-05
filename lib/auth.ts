import { cookies } from "next/headers";

import { backendRequest } from "@/lib/backend";

const SESSION_COOKIE = "portfolio_admin_session";

export async function createLoginSession(sessionToken: string, expiresAt: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function authenticateAdmin(email: string, password: string) {
  return backendRequest<{
    session_token: string;
    expires_at: string;
    admin: { id: number; email: string };
  }>("/api/admin/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });
}

export async function clearLoginSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    try {
      await backendRequest<{ message: string }>("/api/admin/logout", {
        method: "POST",
        body: {
          session_token: sessionToken,
        },
      });
    } catch {
      // The cookie should still be cleared locally even if the backend is unavailable.
    }
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
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    return await backendRequest<{ id: number; email: string }>("/api/admin/session", {
      method: "POST",
      body: {
        session_token: sessionToken,
      },
    });
  } catch {
    return null;
  }
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value || null;
}
