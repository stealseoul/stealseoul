import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/locales";
import { getPosts } from "@/lib/data";
import PostCard from "@/components/PostCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam as Locale);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");

  const sorted = [...getPosts(locale)].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t("heading")}</h1>
      <p className="mt-2 text-neutral-600">{t("subheading")}</p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
