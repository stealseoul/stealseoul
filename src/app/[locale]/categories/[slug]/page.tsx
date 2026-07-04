import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale, locales } from "@/i18n/locales";
import { getAllCategorySlugs, getCategory, getProductsByCategory, getPostsByCategory } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllCategorySlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const category = getCategory(locale as Locale, slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const category = getCategory(locale, slug);
  if (!category) notFound();

  const [tBreadcrumbs, tCategory] = await Promise.all([
    getTranslations("breadcrumbs"),
    getTranslations("category"),
  ]);

  const categoryProducts = getProductsByCategory(locale, slug);
  const categoryPosts = getPostsByCategory(locale, slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-600">
          {tBreadcrumbs("home")}
        </Link>{" "}
        / {category.name}
      </nav>

      <div className={`mt-4 rounded-3xl bg-gradient-to-br p-8 text-white ${category.gradient}`}>
        <span className="text-4xl">{category.emoji}</span>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{category.name}</h1>
        <p className="mt-2 max-w-xl text-white/90">{category.description}</p>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-neutral-900">{tCategory("dealsHeading")}</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {categoryPosts.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-neutral-900">{tCategory("articlesHeading")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
