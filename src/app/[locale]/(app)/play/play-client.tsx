"use client";

import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useTranslations} from "next-intl";

import {getSocket} from "@/lib/socket";

export function PlayClient() {
  const t = useTranslations("play");
  const router = useRouter();
  const params = useParams<{locale: string}>();
  const locale = params?.locale ?? "en";
  const {data: session} = useSession();

  const player = useMemo(
    () => ({
      id: session?.user?.id ?? "guest",
      name: session?.user?.name ?? "Guest",
      image: session?.user?.image ?? null,
      level: 1,
    }),
    [session]
  );

  const [playerCount, setPlayerCount] = useState(4);
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getSocket().then((s) => {
      if (!mounted) return;
      s.on("matchmaking:queued", (p) => setStatus(`Queued (${p.queued}/${p.playerCount})...`));
      s.on("match:found", ({roomCode}: {roomCode: string}) => {
        router.push(`/${locale}/lobby/${roomCode}`);
      });
      s.on("room:created", ({roomCode}: {roomCode: string}) => {
        router.push(`/${locale}/lobby/${roomCode}`);
      });
      s.on("room:error", ({message}: {message: string}) => setStatus(message));
    });
    return () => {
      mounted = false;
    };
  }, [locale, router]);

  async function findMatch() {
    const s = await getSocket();
    setStatus("Searching...");
    s.emit("matchmaking:find", {playerCount, player});
  }

  async function createRoom() {
    const s = await getSocket();
    setStatus("Creating room...");
    s.emit("room:create", {playerCount, player});
  }

  async function joinRoom() {
    const s = await getSocket();
    setStatus("Joining...");
    s.emit("room:join", {roomCode, player});
    router.push(`/${locale}/lobby/${roomCode.toUpperCase().trim()}`);
  }

  return (
    <section className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {session ? "Signed in" : "Sign in to save profile & stats."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">{t("players")}</div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={4}
              max={12}
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full"
            />
            <div className="w-10 text-right text-sm font-semibold">
              {playerCount}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={findMatch}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              {t("findMatch")}
            </button>
            <button
              onClick={createRoom}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              {t("createRoom")}
            </button>
          </div>

          {status ? (
            <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              {status}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border p-5">
          <div className="text-sm font-semibold">{t("roomCode")}</div>
          <div className="mt-3 flex gap-2">
            <input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="ABC123"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/20 dark:bg-zinc-950"
            />
            <button
              disabled={!roomCode.trim()}
              onClick={joinRoom}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              Join
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">
            Do‘stingiz yuborgan room code ni kiriting.
          </div>
        </div>
      </div>
    </section>
  );
}

