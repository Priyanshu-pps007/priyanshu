import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/app/components/admin-login-form";
import { clearLoginSession, getAuthenticatedAdmin, getSessionToken } from "@/lib/auth";
import { getContactSubmissions } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Inbox",
  robots: {
    index: false,
    follow: false,
  },
};

async function logoutAction() {
  "use server";

  await clearLoginSession();
  redirect("/admin-page$2026");
}

export default async function AdminPage() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return (
      <main className="admin-shell">
        <section className="admin-card">
          <p className="eyebrow">Private access</p>
          <h1>Admin inbox</h1>
          <p className="admin-copy">
            Sign in to view contact form submissions captured from the portfolio website.
          </p>
          <AdminLoginForm action="/api/admin/login" />
        </section>
      </main>
    );
  }

  const sessionToken = await getSessionToken();
  const submissions = sessionToken ? await getContactSubmissions(sessionToken) : [];

  return (
    <main className="admin-shell">
      <section className="admin-card wide">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Authenticated</p>
            <h1>Contact submissions</h1>
            <p className="admin-copy">Signed in as {admin.email}</p>
          </div>
          <form action={logoutAction}>
            <button className="ghost-button" type="submit">
              Logout
            </button>
          </form>
        </div>
        <div className="admin-table">
          {submissions.length === 0 ? (
            <p className="empty-state">No one has submitted the contact form yet.</p>
          ) : (
            submissions.map((submission) => (
              <article key={submission.id} className="submission-card">
                <div className="submission-meta">
                  <strong>{submission.name}</strong>
                  <a href={`mailto:${submission.email}`}>{submission.email}</a>
                  <span>{submission.company || "Independent / not specified"}</span>
                  <span>{new Date(submission.submitted_at).toLocaleString("en-IN")}</span>
                </div>
                <p>{submission.message}</p>
                <div className="submission-footer">
                  <span>IP: {submission.ip_address || "Unavailable"}</span>
                  <span>{submission.user_agent || "Unknown client"}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
