"use server";

import { redirect } from "next/navigation";
import { auth, NEON_AUTH_CONFIGURED } from "@/lib/auth/server";
import { isAllowedAdmin } from "@/lib/admin-allowlist";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  if (!NEON_AUTH_CONFIGURED || !auth) {
    return { error: "Admin isn't configured yet — Neon Auth hasn't been connected." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const allowed = await isAllowedAdmin(email);
  if (!allowed) {
    return { error: "This account isn't authorized as an admin." };
  }

  const { error } = await auth.signIn.email({ email, password });
  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (auth) {
    await auth.signOut();
  }
  redirect("/admin/login");
}
