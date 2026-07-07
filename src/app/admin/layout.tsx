import "../globals.css";
import { Geist } from "next/font/google";
import { NEON_AUTH_CONFIGURED } from "@/lib/auth/server";
import { DB_CONFIGURED } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ADMIN_CONFIGURED = NEON_AUTH_CONFIGURED && DB_CONFIGURED;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
        {ADMIN_CONFIGURED ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center p-6">
            <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center">
              <h1 className="text-lg font-bold text-neutral-900">Admin not configured yet</h1>
              <p className="mt-3 text-sm text-neutral-600">
                Neon Auth / the database hasn&apos;t been fully connected yet. Set DATABASE_URL,
                NEON_AUTH_BASE_URL, and NEON_AUTH_COOKIE_SECRET once they exist.
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
