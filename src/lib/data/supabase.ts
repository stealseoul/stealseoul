import { createClient } from "@supabase/supabase-js";
import { Locale } from "@/i18n/locales";
import { Product } from "@/lib/types";

function getAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

interface AdminProductContentRow {
  locale: string;
  name: string;
  brand: string;
  summary: string;
  description: string;
  highlights: string[];
}

interface AdminProductRow {
  slug: string;
  category: string;
  emoji: string;
  price_range: string;
  search_keyword: string;
  verified_discount_note: string | null;
  admin_product_content: AdminProductContentRow[];
}

// Returns [] whenever Supabase isn't configured yet (no project/env vars) or
// the query fails, so the site keeps working on static content alone until
// the admin CMS's database is actually connected.
export async function getAdminProducts(locale: Locale): Promise<Product[]> {
  const client = getAnonClient();
  if (!client) return [];

  const { data, error } = await client
    .from("admin_products")
    .select("slug, category, emoji, price_range, search_keyword, verified_discount_note, admin_product_content(locale, name, brand, summary, description, highlights)");

  if (error || !data) return [];

  const rows = data as unknown as AdminProductRow[];

  return rows
    .map((row) => {
      const content =
        row.admin_product_content.find((c) => c.locale === locale) ??
        row.admin_product_content.find((c) => c.locale === "en");
      if (!content) return null;

      const product: Product = {
        slug: row.slug,
        category: row.category as Product["category"],
        emoji: row.emoji,
        priceRange: row.price_range,
        searchKeyword: row.search_keyword,
        name: content.name,
        brand: content.brand,
        summary: content.summary,
        description: content.description,
        highlights: content.highlights,
      };
      return product;
    })
    .filter((p): p is Product => p !== null);
}
