"use client";

import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {useSession, signIn, signOut} from "next-auth/react";
import {useTranslations} from "next-intl";
import {LogIn, LogOut} from "lucide-react";
import clsx from "clsx";

const navItems = [
  {key: "play", href: "/play"},
  {key: "profile", href: "/profile"},
  {key: "inventory", href: "/inventory"},
  {key: "shop", href: "/shop"},
  {key: "rules", href: "/rules"},
];

export function AppHeader() {
  const t = useTranslations("nav");
  const {data: session} = useSession();
  const pathname = usePathname();
  const params = useParams<{locale: string}>();
  const locale = params?.locale ?? "en";

  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur dark:bg-zinc-950/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href={`/${locale}`}
          className="text-lg font-semibold tracking-tight"
        >
          Mafia
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((it) => {
            const href = `/${locale}${it.href}`;
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={it.key}
                href={href}
                className={clsx(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                )}
              >
                {t(it.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <LogIn size={16} />
              {t("signIn")}
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <LogOut size={16} />
              {t("signOut")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
