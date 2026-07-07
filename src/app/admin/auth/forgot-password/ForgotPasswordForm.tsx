"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/admin/auth/reset-password`,
    });

    if (error) {
      setStatus("error");
      setError(error.message ?? "Something went wrong.");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="mt-6 text-sm text-neutral-600">
        If an account exists for that email, a reset link has been sent. Check your inbox — the
        link expires in 15 minutes.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
