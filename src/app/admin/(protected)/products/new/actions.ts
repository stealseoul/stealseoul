"use server";

import { auth } from "@/lib/auth/server";
import { isAllowedAdmin } from "@/lib/admin-allowlist";
import { sql, DB_CONFIGURED } from "@/lib/db";
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

async function getAuthorizedAdminEmail(): Promise<string | null> {
  if (!auth) return null;
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (!email || !(await isAllowedAdmin(email))) return null;
  return email;
}

export async function createProduct(input: CreateProductInput): Promise<SaveResult> {
  if (!DB_CONFIGURED || !sql) {
    return { ok: false, error: "Database isn't configured." };
  }

  const email = await getAuthorizedAdminEmail();
  if (!email) {
    return { ok: false, error: "Not authorized." };
  }

  if (!input.slug || !input.name || !input.summary) {
    return { ok: false, error: "Slug, name, and summary are required." };
  }

  const existingSlugs = await getAllProductSlugs();
  if (existingSlugs.includes(input.slug)) {
    return { ok: false, error: `Slug "${input.slug}" is already in use — pick a different one.` };
  }

  try {
    const inserted = (await sql`
      insert into admin_products (slug, category, emoji, price_range, search_keyword, asin, amazon_url, verified_discount_note)
      values (
        ${input.slug}, ${input.category}, ${input.emoji || "📦"}, ${input.priceRange},
        ${input.searchKeyword}, ${input.asin || null}, ${input.amazonUrl || null}, ${input.verifiedDiscountNote || null}
      )
      returning id
    `) as unknown as { id: string }[];

    const productId = inserted[0]?.id;
    if (!productId) {
      return { ok: false, error: "Failed to save the product." };
    }

    await sql`
      insert into admin_product_content (product_id, locale, name, brand, summary, description, highlights)
      values (${productId}, 'en', ${input.name}, ${input.brand}, ${input.summary}, ${input.description}, ${JSON.stringify(input.highlights)}::jsonb)
    `;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save the product." };
  }

  revalidateProductPaths(input.slug, input.category);
  return { ok: true };
}
