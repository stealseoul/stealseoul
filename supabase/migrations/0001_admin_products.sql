-- Admin identity is just a Supabase Auth user (create manually via the
-- Supabase dashboard or `supabase.auth.admin.createUser()`). No separate
-- "admins" table for a single hardcoded admin — RLS just requires
-- auth.uid() IS NOT NULL, since there is exactly one legitimate
-- authenticated user for this project.

create table public.admin_products (
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
create table public.admin_product_content (
  product_id uuid not null references public.admin_products(id) on delete cascade,
  locale text not null check (locale in ('en', 'ko', 'es', 'zh', 'ja')),
  name text not null,
  brand text not null default '',
  summary text not null,
  description text not null,
  highlights jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (product_id, locale)
);

alter table public.admin_products enable row level security;
alter table public.admin_product_content enable row level security;

-- The live site is anonymous and needs to read products.
create policy "public read admin_products" on public.admin_products
  for select using (true);
create policy "public read admin_product_content" on public.admin_product_content
  for select using (true);

-- Only the authenticated admin may write.
create policy "admin write admin_products" on public.admin_products
  for all using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin write admin_product_content" on public.admin_product_content
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

create index on public.admin_products (category);
create index on public.admin_product_content (product_id);
