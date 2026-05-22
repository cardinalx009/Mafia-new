import {getRequestConfig} from "next-intl/server";
import {headers} from "next/headers";

export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

function pickLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) return "en";

  const lower = value.toLowerCase();
  // Simple heuristic:
  // - ru-RU, ru, etc -> ru
  // - uz-UZ, uz -> uz
  // - everything else -> en
  if (lower.includes("ru")) return "ru";
  if (lower.includes("uz")) return "uz";
  return "en";
}

export default getRequestConfig(async ({locale}) => {
  const hdrs = await headers();
  const detected = pickLocaleFromAcceptLanguage(hdrs.get("accept-language"));
  const safeLocale = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : detected;

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});

