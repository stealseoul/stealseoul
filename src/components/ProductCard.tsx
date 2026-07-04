import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/locales";
import { Product } from "@/lib/types";
import { getCategory } from "@/lib/data";

export default async function ProductCard({ product }: { product: Product }) {
  const locale = (await getLocale()) as Locale;
  const category = getCategory(locale, product.category);
  const t = await getTranslations("product");

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className={`flex h-36 items-center justify-center bg-gradient-to-br text-6xl ${category?.gradient ?? "from-neutral-200 to-neutral-100"}`}
      >
        {product.emoji}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {category?.shortName}
        </span>
        <h3 className="font-semibold text-neutral-900 group-hover:underline">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-neutral-500">{product.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="font-medium text-neutral-700">{product.priceRange}</span>
          <span className="font-semibold text-orange-600">{t("viewDetails")} →</span>
        </div>
      </div>
    </Link>
  );
}
