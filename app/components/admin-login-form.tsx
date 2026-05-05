"use client";

import { useState } from "react";

type Props = {
  action: string;
};

export function AdminLoginForm({ action }: Props) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? ((await response.json()) as { message?: string }) : null;

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            `Login failed${response.status ? ` (${response.status})` : ""}.`
        );
      }

      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input name="email" type="email" required placeholder="Enter your admin email" />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" required placeholder="Enter your password" />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Unlock inbox"}
      </button>
      {status ? <p className="form-status error">{status}</p> : null}
    </form>
  );
}
