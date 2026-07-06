"use server";

import { createClient } from "@/lib/supabase/server";
import { getAllProductSlugs } from "@/lib/data";
import { revalidateProductPaths } from "@/lib/revalidate-product";
import { scrapeAmazonProductPage } from "@/lib/amazon-scrape";
import { CategorySlug } from "@/lib/types";

export interface AmazonPreviewResult {
  ok: boolean;
  asin: string;
  sourceUrl: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  priceText?: string;
}

function extractAsin(raw: string): string | null {
  const trimmed = raw.trim();
  const dpMatch = trimmed.match(/\/dp\/([A-Z0-9]{10})/i);
  if (dpMatch) return dpMatch[1].toUpperCase();
  const gpMatch = trimmed.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  if (gpMatch) return gpMatch[1].toUpperCase();
  if (/^[A-Z0-9]{10}$/i.test(trimmed)) return trimmed.toUpperCase();
  return null;
}

// The only place in the app that ever fetches an Amazon page. Manual,
// one-shot, admin-triggered only — never throws, always returns a result
// the UI can render as an editable (never auto-saved) preview.
export async function fetchAmazonPreview(rawInput: string): Promise<AmazonPreviewResult | { ok: false; error: string }> {
  const asin = extractAsin(rawInput);
  if (!asin) {
    return { ok: false, error: "Couldn't find a valid ASIN in that input." };
  }

  const sourceUrl = rawInput.trim().startsWith("http") ? rawInput.trim() : `https://www.amazon.com/dp/${asin}`;
  const scraped = await scrapeAmazonProductPage(sourceUrl);

  return {
    ok: Boolean(scraped),
    asin,
    sourceUrl,
    title: scraped?.title,
    description: scraped?.description,
    imageUrl: scraped?.imageUrl,
    priceText: scraped?.priceText,
  };
}

export interface CreateProductInput {
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

export async function createProduct(input: CreateProductInput): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not authenticated." };
  }

  if (!input.slug || !input.name || !input.summary) {
    return { ok: false, error: "Slug, name, and summary are required." };
  }

  const existingSlugs = await getAllProductSlugs();
  if (existingSlugs.includes(input.slug)) {
    return { ok: false, error: `Slug "${input.slug}" is already in use — pick a different one.` };
  }

  const { data: product, error: insertError } = await supabase
    .from("admin_products")
    .insert({
      slug: input.slug,
      category: input.category,
      emoji: input.emoji || "📦",
      price_range: input.priceRange,
      search_keyword: input.searchKeyword,
      asin: input.asin || null,
      amazon_url: input.amazonUrl || null,
      verified_discount_note: input.verifiedDiscountNote || null,
    })
    .select("id")
    .single();

  if (insertError || !product) {
    return { ok: false, error: insertError?.message ?? "Failed to save the product." };
  }

  const { error: contentError } = await supabase.from("admin_product_content").insert({
    product_id: product.id,
    locale: "en",
    name: input.name,
    brand: input.brand,
    summary: input.summary,
    description: input.description,
    highlights: input.highlights,
  });

  if (contentError) {
    return { ok: false, error: contentError.message };
  }

  revalidateProductPaths(input.slug, input.category);
  return { ok: true };
}
