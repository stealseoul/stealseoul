import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale, locales } from "@/i18n/locales";
import { getAllPostSlugs, getPost, getCategory, getProduct } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllPostSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const post = getPost(locale, slug);
  if (!post) notFound();

  const [tBreadcrumbs, tBlog] = await Promise.all([
    getTranslations("breadcrumbs"),
    getTranslations("blog"),
  ]);

  const category = getCategory(locale, post.category);
  const relatedProducts = post.productSlugs
    .map((s) => getProduct(locale, s))
    .filter((p) => p !== undefined);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-600">
          {tBreadcrumbs("home")}
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-neutral-600">
          {tBlog("heading")}
        </Link>
      </nav>

      <div
        className={`mt-4 flex h-48 items-center justify-center rounded-3xl bg-gradient-to-br text-7xl ${category?.gradient ?? "from-neutral-200 to-neutral-100"}`}
      >
        {post.coverEmoji}
      </div>

      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {category?.shortName} · {post.publishedAt} · {tBlog("readTime", { minutes: post.readMinutes })}
      </span>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">{post.title}</h1>
      <p className="mt-3 text-neutral-600">{post.excerpt}</p>

      <article className="prose prose-neutral mt-8 max-w-none">
        {post.body.map((paragraph, i) => (
          <p key={i} className="mb-4 leading-relaxed text-neutral-800">
            {paragraph}
          </p>
        ))}
      </article>

      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-bold text-neutral-900">{tBlog("itemsHeading")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {relatedProducts.map((p) => (
              <ProductCard key={p!.slug} product={p!} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
