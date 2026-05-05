"use client";

import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status.kind !== "success") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus({ kind: "idle", message: "" });
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send your message right now.");
      }

      setForm(initialForm);
      setStatus({
        kind: "success",
        message:
          payload.message || "Message sent successfully. Priyanshu will contact you soon.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your message.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {status.kind === "success" ? (
        <div className="form-toast success" role="status" aria-live="polite">
          <strong>Message sent successfully</strong>
          <p>{status.message}</p>
        </div>
      ) : null}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            <span>Name</span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              name="name"
              placeholder="Your full name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              name="email"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          <span>Company or role</span>
          <input
            value={form.company}
            onChange={(event) =>
              setForm((current) => ({ ...current, company: event.target.value }))
            }
            name="company"
            placeholder="Startup, agency, product team..."
          />
        </label>
        <label>
          <span>Project details</span>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            name="message"
            placeholder="Tell me what you’re building, the timeline, and the kind of AI or backend support you need."
          />
        </label>
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Start the conversation"}
        </button>
        {status.kind === "error" ? (
          <p className="form-status error" role="alert">
            {status.message}
          </p>
        ) : null}
      </form>
    </>
  );
}
