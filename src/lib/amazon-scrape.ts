// Isolated Amazon product-page fetch + parse logic. This is the exact
// point to swap out for the official PA-API once Associates access is
// granted — nothing outside this file should know or care how the preview
// data was obtained. Only ever called on a single, manual, admin-triggered
// click (see actions.ts) — no retries, no scheduling, no bulk fetching.

export interface ScrapedProductData {
  title?: string;
  description?: string;
  imageUrl?: string;
  priceText?: string;
}

function extractMetaContent(html: string, attr: "property" | "name", key: string): string | undefined {
  const pattern = new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["']`, "i");
  const reversed = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["']`, "i");
  return html.match(pattern)?.[1] ?? html.match(reversed)?.[1];
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export async function scrapeAmazonProductPage(url: string): Promise<ScrapedProductData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const html = await response.text();

    const title =
      extractMetaContent(html, "property", "og:title") ?? html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
    const description =
      extractMetaContent(html, "property", "og:description") ?? extractMetaContent(html, "name", "description");
    const imageUrl = extractMetaContent(html, "property", "og:image");
    const priceText = html.match(/\$[0-9]+(?:\.[0-9]{2})?/)?.[0];

    if (!title && !description && !imageUrl) return null;

    return {
      title: title ? decodeHtmlEntities(title) : undefined,
      description: description ? decodeHtmlEntities(description) : undefined,
      imageUrl,
      priceText,
    };
  } catch {
    return null;
  }
}
