import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/locales";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclosurePage" });
  return { title: t("title") };
}

export default async function DisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("disclosurePage");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t("title")}</h1>
      <div className="mt-8 space-y-6 leading-relaxed text-neutral-700">
        {paragraphs.map((p, i) => (
          <p key={i} className={i === paragraphs.length - 1 ? "text-neutral-500" : undefined}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
