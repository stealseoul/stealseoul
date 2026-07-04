import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/locales";
import { getCategories } from "@/lib/data";
import LocaleSwitcher from "./LocaleSwitcher";

export default async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("nav");
  const categories = getCategories(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="text-2xl">🛍️</span>
          StealSeoul
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-600 md:flex">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="hover:text-neutral-900">
              {c.name}
            </Link>
          ))}
          <Link href="/blog" className="hover:text-neutral-900">
            {t("blog")}
          </Link>
          <Link href="/about" className="hover:text-neutral-900">
            {t("about")}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/blog"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 md:hidden"
          >
            {t("browse")}
          </Link>
        </div>
      </div>
    </header>
  );
}
