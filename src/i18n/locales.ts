export const locales = ["en", "ko", "es", "zh", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  es: "Español",
  zh: "中文",
  ja: "日本語",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  ko: "🇰🇷",
  es: "🇪🇸",
  zh: "🇨🇳",
  ja: "🇯🇵",
};
