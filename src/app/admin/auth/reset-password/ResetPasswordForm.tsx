"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = searchParams.get("error");

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setStatus("saving");
    setError(null);

    const { error } = await authClient.resetPassword({ newPassword, token });

    if (error) {
      setStatus("error");
      setError(error.message ?? "Something went wrong.");
      return;
    }

    router.push("/admin/login");
  }

  if (tokenError || !token) {
    return (
      <p className="mt-6 text-sm text-red-600">
        This reset link is invalid or has expired. Request a new one from the{" "}
        <a href="/admin/auth/forgot-password" className="underline">
          forgot password
        </a>{" "}
        page.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div>
        <label htmlFor="newPassword" className="text-sm font-medium text-neutral-700">
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}
