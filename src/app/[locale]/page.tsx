import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/locales";
import { getCategories, getProducts, getPosts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import PostCard from "@/components/PostCard";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam as Locale);
  const locale = (await getLocale()) as Locale;

  const [tHero, tHome] = await Promise.all([getTranslations("hero"), getTranslations("home")]);

  const categories = getCategories(locale);
  const featuredProducts = getProducts(locale).slice(0, 8);
  const latestPosts = [...getPosts(locale)]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 4);

  return (
    <div>
      <section className="border-b border-black/5 bg-gradient-to-b from-orange-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            {tHero("eyebrow")}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            {tHero("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-neutral-600 sm:text-lg">{tHero("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              {tHero("ctaPrimary")}
            </Link>
            <Link
              href="/categories/korean-food"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400"
            >
              {tHero("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{tHome("categoriesHeading")}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className={`flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-br p-5 text-white transition hover:-translate-y-0.5 hover:shadow-lg ${c.gradient}`}
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="font-semibold">{c.name}</span>
              <span className="text-xs text-white/80">{c.shortName}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{tHome("dealsHeading")}</h2>
          <Link href="/categories/korean-food" className="text-sm font-semibold text-orange-600">
            {tHome("viewAll")} →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{tHome("articlesHeading")}</h2>
          <Link href="/blog" className="text-sm font-semibold text-orange-600">
            {tHome("viewAllBlog")} →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latestPosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
