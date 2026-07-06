"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateProductPaths } from "@/lib/revalidate-product";
import { CategorySlug } from "@/lib/types";

export interface UpdateProductInput {
  slug: string;
  category: CategorySlug;
  emoji: string;
  priceRange: string;
  searchKeyword: string;
  asin?: string;
  amazonUrl?: string;
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

// Upserts by slug: if this slug only exists today as static seed content,
// this creates the first admin_products row for it, which then wins over
// the static version in the merge (src/lib/data/index.ts). If it's already
// an admin-managed row, this updates it in place.
export async function updateProduct(input: UpdateProductInput): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not authenticated." };
  }

  if (!input.name || !input.summary) {
    return { ok: false, error: "Name and summary are required." };
  }

  const { data: product, error: upsertError } = await supabase
    .from("admin_products")
    .upsert(
      {
        slug: input.slug,
        category: input.category,
        emoji: input.emoji || "📦",
        price_range: input.priceRange,
        search_keyword: input.searchKeyword,
        asin: input.asin || null,
        amazon_url: input.amazonUrl || null,
        verified_discount_note: input.verifiedDiscountNote || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();

  if (upsertError || !product) {
    return { ok: false, error: upsertError?.message ?? "Failed to save the product." };
  }

  const { error: contentError } = await supabase.from("admin_product_content").upsert(
    {
      product_id: product.id,
      locale: "en",
      name: input.name,
      brand: input.brand,
      summary: input.summary,
      description: input.description,
      highlights: input.highlights,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "product_id,locale" },
  );

  if (contentError) {
    return { ok: false, error: contentError.message };
  }

  revalidateProductPaths(input.slug, input.category);
  return { ok: true };
}
