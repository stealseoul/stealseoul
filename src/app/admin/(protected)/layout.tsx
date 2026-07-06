import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, NEON_AUTH_CONFIGURED } from "@/lib/auth/server";
import { DB_CONFIGURED } from "@/lib/db";
import { isAllowedAdmin } from "@/lib/admin-allowlist";
import { logoutAction } from "../login/actions";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!NEON_AUTH_CONFIGURED || !DB_CONFIGURED || !auth) {
    redirect("/admin/login");
  }

  const { data: session } = await auth.getSession();
  const email = session?.user?.email;

  if (!email || !(await isAllowedAdmin(email))) {
    redirect("/admin/login");
  }

  return (
    <>
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-bold">
            StealSeoul Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <span className="text-neutral-400">{email}</span>
            <Link href="/admin/products/new" className="text-orange-600 hover:underline">
              + Add product
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-neutral-500 hover:text-neutral-800">
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </>
  );
}
