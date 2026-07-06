import { createNeonAuth } from "@neondatabase/auth/next/server";

export const NEON_AUTH_CONFIGURED = Boolean(
  process.env.NEON_AUTH_BASE_URL && process.env.NEON_AUTH_COOKIE_SECRET,
);

// Only constructed when configured — every caller must check
// NEON_AUTH_CONFIGURED first (see src/app/admin/layout.tsx and
// src/app/admin/(protected)/layout.tsx) so the admin area degrades to a
// friendly message instead of crashing if env vars are ever missing.
export const auth = NEON_AUTH_CONFIGURED
  ? createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL!,
      cookies: {
        secret: process.env.NEON_AUTH_COOKIE_SECRET!,
      },
    })
  : null;
