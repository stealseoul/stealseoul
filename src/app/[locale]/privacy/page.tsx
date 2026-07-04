import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/locales";

interface PrivacySection {
  heading: string;
  body: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("privacyPage");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{t("title")}</h1>
      <p className="mt-6 leading-relaxed text-neutral-700">{t("intro")}</p>
      <div className="mt-8 space-y-6">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-neutral-900">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-neutral-700">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
