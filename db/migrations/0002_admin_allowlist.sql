-- Neon Auth (beta) currently allows anyone on the web to self-register —
-- there's no built-in restricted-signup support yet. So "is authenticated"
-- alone is NOT sufficient authorization for admin writes. This allowlist
-- is the actual gate: a user must be authenticated AND have their email
-- listed here before any admin read/write action succeeds. Add admins by
-- inserting their email here directly (matches the email they sign in
-- with via Neon Auth).

create table if not exists admin_allowlist (
  email text primary key,
  added_at timestamptz not null default now()
);
