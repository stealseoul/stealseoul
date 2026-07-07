import { notFound } from "next/navigation";
import { AuthView } from "@neondatabase/auth-ui";

// Only used for flows our custom /admin/login page doesn't cover —
// forgot-password and reset-password. Deliberately NOT wired up to the
// library's full path set: Neon Auth's beta lets anyone self-register, so
// we don't want a public sign-up view reachable here on top of that.
// Sign-in stays on our own page so we keep the admin-allowlist check in
// the loop.
const ALLOWED_PATHS = ["forgot-password", "reset-password"];

export const dynamicParams = false;

export function generateStaticParams() {
  return ALLOWED_PATHS.map((path) => ({ path }));
}

export default async function AdminAuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  if (!ALLOWED_PATHS.includes(path)) notFound();

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <AuthView path={path} />
    </div>
  );
}
