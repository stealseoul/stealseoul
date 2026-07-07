// Parses a raw copy-paste of an Amazon product page's visible text (the
// admin selects all + copies the page they're already viewing as a normal
// human visitor, then pastes it here). No network request to Amazon ever
// happens in this file — it only works with text the admin already has on
// their clipboard, so there's no scraping/bot-detection concern at all.

export interface ParsedProductInfo {
  asin?: string;
  title?: string;
  brand?: string;
  priceText?: string;
  highlights: string[];
}

function findAsin(text: string): string | undefined {
  const match = text.match(/ASIN[\s\S]{0,20}?\b([A-Z0-9]{10})\b/i);
  return match ? match[1].toUpperCase() : undefined;
}

function findTitleAndBrand(text: string): { title?: string; brand?: string } {
  // The product title line consistently appears immediately before
  // "Visit the <Brand> Store" on Amazon product pages.
  const storeMatch = text.match(/([^\n]{10,300})\n\s*Visit the (.+?) Store/);
  if (storeMatch) {
    return { title: storeMatch[1].trim(), brand: storeMatch[2].trim() };
  }

  // Fallback: a labeled "Brand" row (from the specs table), title left unset.
  const brandMatch = text.match(/\bBrand\b[\t ]+([^\n\t]+)/);
  return { brand: brandMatch?.[1]?.trim() };
}

function findPrice(text: string): string | undefined {
  const nearLabel = text.match(/One-time purchase\s*\n?\$?\s*([\d]+\.[\d]{2})/i);
  if (nearLabel) return `$${nearLabel[1]}`;

  // Fall back to the first price-looking token in roughly the first third
  // of the page (buy box usually appears before unrelated "customers also
  // bought" sections further down).
  const firstThird = text.slice(0, Math.max(3000, Math.floor(text.length / 3)));
  const anyPrice = firstThird.match(/\$([\d]+\.[\d]{2})/);
  return anyPrice ? `$${anyPrice[1]}` : undefined;
}

function findHighlights(text: string): string[] {
  const section = text.match(/About this item\s*\n([\s\S]*?)\n\s*Show less/i);
  const body = section?.[1];
  if (!body) return [];

  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 15 && line.length < 400)
    .slice(0, 8);
}

export function parseAmazonPageText(rawText: string): ParsedProductInfo {
  const text = rawText.replace(/\r\n/g, "\n");
  const { title, brand } = findTitleAndBrand(text);

  return {
    asin: findAsin(text),
    title,
    brand,
    priceText: findPrice(text),
    highlights: findHighlights(text),
  };
}
