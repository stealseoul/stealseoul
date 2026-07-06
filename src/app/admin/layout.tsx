const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
        {SUPABASE_CONFIGURED ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center p-6">
            <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center">
              <h1 className="text-lg font-bold text-neutral-900">Admin not configured yet</h1>
              <p className="mt-3 text-sm text-neutral-600">
                The Supabase project for the admin CMS hasn&apos;t been connected yet. Set
                NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY once it exists.
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
