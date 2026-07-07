"use server";

import { auth } from "@/lib/auth/server";
import { isAllowedAdmin } from "@/lib/admin-allowlist";
import { sql, DB_CONFIGURED } from "@/lib/db";
import { revalidateProductPaths } from "@/lib/revalidate-product";
import { generateLifestyleImage, GenerateLifestyleImageResult } from "@/lib/lifestyle-image";
import { CategorySlug } from "@/lib/types";

export interface UpdateProductInput {
  slug: string;
  category: CategorySlug;
  emoji: string;
  priceRange: string;
  searchKeyword: string;
  asin?: string;
  amazonUrl?: string;
  imageUrl?: string;
  verifiedDiscountNote?: string;
  name: string;
  brand: string;
  summary: string;
  description: string;
  highlights: string[];
}

export interface SaveResult {
  ok: boolean;
  error?: string;
}

async function getAuthorizedAdminEmail(): Promise<string | null> {
  if (!auth) return null;
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (!email || !(await isAllowedAdmin(email))) return null;
  return email;
}

// Upserts by slug: if this slug only exists today as static seed content,
// this creates the first admin_products row for it, which then wins over
// the static version in the merge (src/lib/data/index.ts). If it's already
// an admin-managed row, this updates it in place.
export async function updateProduct(input: UpdateProductInput): Promise<SaveResult> {
  if (!DB_CONFIGURED || !sql) {
    return { ok: false, error: "Database isn't configured." };
  }

  const email = await getAuthorizedAdminEmail();
  if (!email) {
    return { ok: false, error: "Not authorized." };
  }

  if (!input.name || !input.summary) {
    return { ok: false, error: "Name and summary are required." };
  }

  try {
    const upserted = (await sql`
      insert into admin_products (slug, category, emoji, price_range, search_keyword, asin, amazon_url, image_url, verified_discount_note, updated_at)
      values (
        ${input.slug}, ${input.category}, ${input.emoji || "📦"}, ${input.priceRange},
        ${input.searchKeyword}, ${input.asin || null}, ${input.amazonUrl || null}, ${input.imageUrl || null}, ${input.verifiedDiscountNote || null}, now()
      )
      on conflict (slug) do update set
        category = excluded.category,
        emoji = excluded.emoji,
        price_range = excluded.price_range,
        search_keyword = excluded.search_keyword,
        asin = excluded.asin,
        amazon_url = excluded.amazon_url,
        image_url = excluded.image_url,
        verified_discount_note = excluded.verified_discount_note,
        updated_at = now()
      returning id
    `) as unknown as { id: string }[];

    const productId = upserted[0]?.id;
    if (!productId) {
      return { ok: false, error: "Failed to save the product." };
    }

    await sql`
      insert into admin_product_content (product_id, locale, name, brand, summary, description, highlights, updated_at)
      values (${productId}, 'en', ${input.name}, ${input.brand}, ${input.summary}, ${input.description}, ${JSON.stringify(input.highlights)}::jsonb, now())
      on conflict (product_id, locale) do update set
        name = excluded.name,
        brand = excluded.brand,
        summary = excluded.summary,
        description = excluded.description,
        highlights = excluded.highlights,
        updated_at = now()
    `;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save the product." };
  }

  revalidateProductPaths(input.slug, input.category);
  return { ok: true };
}

// Generates a brand-new AI lifestyle image (never a real Amazon photo — see
// src/lib/lifestyle-image.ts). Gated behind the same admin check as writes
// since each call costs real money against the Gemini API.
export async function generateProductImage(
  slug: string,
  name: string,
  summary: string,
): Promise<GenerateLifestyleImageResult> {
  const email = await getAuthorizedAdminEmail();
  if (!email) {
    return { ok: false, error: "Not authorized." };
  }
  return generateLifestyleImage(slug, name, summary);
}
