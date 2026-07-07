import { getTranslations } from "next-intl/server";
import { amazonSearchLink, amazonProductLink } from "@/lib/affiliate";

export default async function AmazonButton({ keyword, asin }: { keyword: string; asin?: string }) {
  const t = await getTranslations("product");
  const href = asin ? amazonProductLink(asin) : amazonSearchLink(keyword);

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
    >
      {t("viewOnAmazon")}
      <span aria-hidden>↗</span>
    </a>
  );
}
