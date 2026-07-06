import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "../login/actions";

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!SUPABASE_CONFIGURED) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
