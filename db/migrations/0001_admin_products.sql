-- Runs on Neon Postgres. This database is only ever reached from trusted
-- server-side code (Server Components/Actions running on Vercel), never
-- exposed to the browser directly — unlike Supabase's anon-key model,
-- there is no public REST layer here, so Postgres Row Level Security
-- isn't the enforcement point. Authorization (session + admin allowlist)
-- happens in the application layer instead — see 0002_admin_allowlist.sql
-- and src/lib/admin-allowlist.ts.

create table if not exists admin_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('korean-food', 'k-beauty', 'baby-kids', 'ipx-goods')),
  emoji text not null default '📦',
  price_range text not null,
  search_keyword text not null,
  asin text,
  amazon_url text,
  verified_discount_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Per-locale content, one row per (product, locale). A missing row for a
-- given locale falls back to the 'en' row in the app's data layer.
create table if not exists admin_product_content (
  product_id uuid not null references admin_products(id) on delete cascade,
  locale text not null check (locale in ('en', 'ko', 'es', 'zh', 'ja')),
  name text not null,
  brand text not null default '',
  summary text not null,
  description text not null,
  highlights jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (product_id, locale)
);

create index if not exists admin_products_category_idx on admin_products (category);
create index if not exists admin_product_content_product_id_idx on admin_product_content (product_id);
