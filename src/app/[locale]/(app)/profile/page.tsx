import {getServerAuthSession} from "@/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  return (
    <section className="grid gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {session?.user?.email ?? "Not signed in"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-5 md:col-span-2">
          <div className="text-sm font-semibold">Overview</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <span className="text-zinc-500">Username:</span>{" "}
              {session?.user?.name ?? "Guest"}
            </div>
            <div>
              <span className="text-zinc-500">Level:</span> 1
            </div>
            <div>
              <span className="text-zinc-500">XP:</span> 0 / 100
            </div>
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            Keyingi bosqichda profil ma’lumotlari Prisma DB ga yoziladi (level,
            statistika, avatar).
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">Stats</div>
          <div className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <span className="text-zinc-500">Games played:</span> 0
            </div>
            <div>
              <span className="text-zinc-500">Wins:</span> 0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

