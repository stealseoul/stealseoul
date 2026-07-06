const AMAZON_ASSOC_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOC_TAG ?? "";

export function amazonSearchLink(keyword: string): string {
  const params = new URLSearchParams({ k: keyword });
  if (AMAZON_ASSOC_TAG) {
    params.set("tag", AMAZON_ASSOC_TAG);
  }
  return `https://www.amazon.com/s?${params.toString()}`;
}

export function amazonProductLink(asin: string): string {
  const params = new URLSearchParams();
  if (AMAZON_ASSOC_TAG) {
    params.set("tag", AMAZON_ASSOC_TAG);
  }
  const query = params.toString();
  return `https://www.amazon.com/dp/${asin}${query ? `?${query}` : ""}`;
}

export const hasLiveAssociateTag = AMAZON_ASSOC_TAG.length > 0;
