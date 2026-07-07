import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale, locales } from "@/i18n/locales";
import { getAllProductSlugs, getProduct, getProductsByCategory, getCategory } from "@/lib/data";
import AmazonButton from "@/components/AmazonButton";
import ProductCard from "@/components/ProductCard";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProduct(locale as Locale, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const product = await getProduct(locale, slug);
  if (!product) notFound();

  const [tBreadcrumbs, tProduct] = await Promise.all([
    getTranslations("breadcrumbs"),
    getTranslations("product"),
  ]);

  const category = getCategory(locale, product.category);
  const related = (await getProductsByCategory(locale, product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-600">
          {tBreadcrumbs("home")}
        </Link>{" "}
        /{" "}
        <Link href={`/categories/${product.category}`} className="hover:text-neutral-600">
          {category?.name}
        </Link>{" "}
        / {product.name}
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div
          className={`flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br text-8xl ${category?.gradient ?? "from-neutral-200 to-neutral-100"}`}
        >
          {product.emoji}
        </div>
        <div className="flex flex-col justify-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {category?.shortName} · {product.brand}
          </span>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{product.name}</h1>
          <p className="text-neutral-600">{product.summary}</p>
          <p className="text-lg font-semibold text-neutral-800">{product.priceRange}</p>
          <div>
            <AmazonButton keyword={product.searchKeyword} asin={product.asin} />
          </div>
          <p className="text-xs text-neutral-400">{tProduct("affiliateNote")}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-neutral-900">{tProduct("detailsHeading")}</h2>
        <p className="mt-3 leading-relaxed text-neutral-700">{product.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-neutral-900">{tProduct("highlightsHeading")}</h2>
        <ul className="mt-3 space-y-2">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-neutral-700">
              <span className="text-orange-500">✓</span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-bold text-neutral-900">{tProduct("relatedHeading")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
