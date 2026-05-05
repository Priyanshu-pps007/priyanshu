import { backendRequest } from "@/lib/backend";

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  submitted_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export async function saveContactSubmission(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  await backendRequest<{ message: string }>("/api/contact", {
    method: "POST",
    body: {
      name: input.name,
      email: input.email,
      company: input.company || null,
      message: input.message,
      ip_address: input.ipAddress || null,
      user_agent: input.userAgent || null,
    },
  });
}

export async function getContactSubmissions(sessionToken: string) {
  return backendRequest<ContactSubmission[]>("/api/admin/submissions", {
    method: "POST",
    body: {
      session_token: sessionToken,
    },
  });
}
