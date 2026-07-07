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
  summary?: string;
  description?: string;
}

const NAME_MAX_LENGTH = 50;
const SUMMARY_MAX_LENGTH = 160;

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
}

// Amazon titles are SEO-stuffed (size, pack count, flavor, and a marketing
// tagline all crammed into 100-200+ chars) — not something we want to show
// as-is as a product name. Drop anything after a "|" tagline separator,
// then greedily keep comma-separated segments (name, then the most useful
// variant detail) that still fit in a short, readable name.
function simplifyTitle(rawTitle: string): string {
  const base = rawTitle.split(/\s*\|\s*/)[0].trim();
  if (base.length <= NAME_MAX_LENGTH) return base;

  const segments = base.split(/,\s*/);
  let result = segments[0];
  for (let i = 1; i < segments.length; i++) {
    const candidate = `${result}, ${segments[i]}`;
    if (candidate.length > NAME_MAX_LENGTH) break;
    result = candidate;
  }
  return truncateAtWord(result, NAME_MAX_LENGTH);
}

function lowercaseFirst(text: string): string {
  return text.length ? text[0].toLowerCase() + text.slice(1) : text;
}

function buildSummary(title: string, brand: string | undefined, highlights: string[]): string {
  const lead = brand ? `${title} by ${brand}` : title;
  const firstHighlight = highlights[0]?.replace(/[.:;]+$/, "").trim();
  if (firstHighlight) {
    const combined = `${lead} — ${lowercaseFirst(firstHighlight)}.`;
    if (combined.length <= SUMMARY_MAX_LENGTH) return combined;
  }
  return truncateAtWord(`${lead}.`, SUMMARY_MAX_LENGTH);
}

// Amazon PDPs often carry a prose "Product Description" section (brand-
// written copy) below the bullet highlights — richer than the bullets alone.
function findProductDescription(text: string): string | undefined {
  const match = text.match(
    /Product [Dd]escription\s*\n([\s\S]*?)\n\s*(?:Product information|Product details|Warranty (?:&|and) Support|Important information|Looking for specific info|From the brand|Customer Questions|Customer reviews|Videos|$)/,
  );
  const body = match?.[1]?.trim();
  if (!body) return undefined;
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 1200);
}

function buildDescription(
  title: string,
  brand: string | undefined,
  highlights: string[],
  productDescription: string | undefined,
): string {
  if (productDescription) return productDescription;
  const intro = brand ? `${title} by ${brand}.` : `${title}.`;
  return highlights.length > 0 ? `${intro} ${highlights.join(" ")}` : intro;
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
  const { title: rawTitle, brand } = findTitleAndBrand(text);
  const title = rawTitle ? simplifyTitle(rawTitle) : undefined;
  const highlights = findHighlights(text);
  const productDescription = findProductDescription(text);

  return {
    asin: findAsin(text),
    title,
    brand,
    priceText: findPrice(text),
    highlights,
    summary: title ? buildSummary(title, brand, highlights) : undefined,
    description: title ? buildDescription(title, brand, highlights, productDescription) : undefined,
  };
}
