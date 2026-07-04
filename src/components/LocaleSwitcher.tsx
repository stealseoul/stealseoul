"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeLabels, localeFlags, Locale } from "@/i18n/locales";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value as Locale })}
      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeFlags[l]} {localeLabels[l]}
        </option>
      ))}
    </select>
  );
}
