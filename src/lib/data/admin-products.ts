import { sql, DB_CONFIGURED } from "@/lib/db";
import { Locale } from "@/i18n/locales";
import { Product } from "@/lib/types";

interface ProductWithContentRow {
  slug: string;
  category: string;
  emoji: string;
  price_range: string;
  search_keyword: string;
  asin: string | null;
  locale: string;
  name: string;
  brand: string;
  summary: string;
  description: string;
  highlights: string[];
}

// Returns [] whenever the database isn't configured or the query fails, so
// the site keeps working on static content alone until Neon is connected.
export async function getAdminProducts(locale: Locale): Promise<Product[]> {
  if (!DB_CONFIGURED || !sql) return [];

  try {
    const rows = (await sql`
      select p.slug, p.category, p.emoji, p.price_range, p.search_keyword, p.asin,
             c.locale, c.name, c.brand, c.summary, c.description, c.highlights
      from admin_products p
      join admin_product_content c on c.product_id = p.id
    `) as unknown as ProductWithContentRow[];

    const bySlug = new Map<string, ProductWithContentRow[]>();
    for (const row of rows) {
      const list = bySlug.get(row.slug) ?? [];
      list.push(row);
      bySlug.set(row.slug, list);
    }

    const products: Product[] = [];
    for (const [slug, contentRows] of bySlug) {
      const row = contentRows.find((c) => c.locale === locale) ?? contentRows.find((c) => c.locale === "en");
      if (!row) continue;
      products.push({
        slug,
        category: row.category as Product["category"],
        emoji: row.emoji,
        priceRange: row.price_range,
        searchKeyword: row.search_keyword,
        asin: row.asin ?? undefined,
        name: row.name,
        brand: row.brand,
        summary: row.summary,
        description: row.description,
        highlights: row.highlights,
      });
    }
    return products;
  } catch {
    return [];
  }
}
