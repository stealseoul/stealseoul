import { sql, DB_CONFIGURED } from "@/lib/db";

// The real authorization boundary for the admin area. Neon Auth (beta)
// lets anyone sign up, so being authenticated is not enough — the signed-in
// email must also be listed in admin_allowlist. Checked both in the
// protected layout (UX) and again inside every write Server Action
// (the actual security boundary).
export async function isAllowedAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email || !DB_CONFIGURED || !sql) return false;
  const rows = await sql`select 1 from admin_allowlist where email = ${email.toLowerCase()} limit 1`;
  return rows.length > 0;
}
