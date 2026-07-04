import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-16 border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-500 sm:px-6">
        <p className="max-w-3xl leading-relaxed">{t("disclosure")}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-neutral-700">
            {t("links.about")}
          </Link>
          <Link href="/disclosure" className="hover:text-neutral-700">
            {t("links.disclosure")}
          </Link>
          <Link href="/privacy" className="hover:text-neutral-700">
            {t("links.privacy")}
          </Link>
          <Link href="/blog" className="hover:text-neutral-700">
            {t("links.blog")}
          </Link>
        </div>
        <p className="mt-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
