import Link from "next/link";
import {getTranslations} from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations("home");

  return (
    <section className="grid gap-6">
      <div className="rounded-2xl border bg-gradient-to-b from-zinc-50 to-white p-8 dark:from-zinc-950 dark:to-zinc-950">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-300">
          {t("subtitle")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/play`}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Play
          </Link>
          <Link
            href={`/${locale}/rules`}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Rules
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">Matchmaking</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            4+ o‘yinchi, avtomatik server qidirish.
          </div>
        </div>
        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">Private room</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Code orqali do‘stlar bilan ulanib o‘ynash.
          </div>
        </div>
        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">Profile & Level</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Avatar, level, statistika va inventar.
          </div>
        </div>
      </div>
    </section>
  );
}

