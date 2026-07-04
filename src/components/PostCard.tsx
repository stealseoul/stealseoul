import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/locales";
import { Post } from "@/lib/types";
import { getCategory } from "@/lib/data";

export default async function PostCard({ post }: { post: Post }) {
  const locale = (await getLocale()) as Locale;
  const category = getCategory(locale, post.category);
  const t = await getTranslations("blog");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className={`flex h-32 items-center justify-center bg-gradient-to-br text-5xl ${category?.gradient ?? "from-neutral-200 to-neutral-100"}`}
      >
        {post.coverEmoji}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {category?.shortName} · {t("readTime", { minutes: post.readMinutes })}
        </span>
        <h3 className="font-semibold text-neutral-900 group-hover:underline">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-neutral-500">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-xs text-neutral-400">{post.publishedAt}</span>
      </div>
    </Link>
  );
}
