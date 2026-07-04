import { getTranslations } from "next-intl/server";
import { amazonSearchLink } from "@/lib/affiliate";

export default async function AmazonButton({ keyword }: { keyword: string }) {
  const t = await getTranslations("product");

  return (
    <a
      href={amazonSearchLink(keyword)}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
    >
      {t("viewOnAmazon")}
      <span aria-hidden>↗</span>
    </a>
  );
}
