import {NextResponse, type NextRequest} from "next/server";
import {locales, type Locale} from "./src/i18n/request";

const PUBLIC_FILE = /\.(.*)$/;

function pickLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) return "en";
  const lower = value.toLowerCase();
  if (lower.includes("ru")) return "ru";
  if (lower.includes("uz")) return "uz";
  return "en";
}

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Skip internal Next.js paths, API routes, and public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocalePrefix) return NextResponse.next();

  const locale = pickLocaleFromAcceptLanguage(
    request.headers.get("accept-language")
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};

