"use client";

import {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useTranslations} from "next-intl";
import type {Socket} from "socket.io-client";

import {getSocket} from "@/lib/socket";

type PlayerPublic = {
  id: string;
  name: string;
  image?: string | null;
  level?: number;
};

type RoomState = {
  roomCode: string;
  playerCount: number;
  players: PlayerPublic[];
};

type ChatMsg = {
  id: string;
  text: string;
  player: PlayerPublic;
  at: number;
};

export function LobbyClient({params}: {params: Promise<{roomCode: string}>}) {
  const t = useTranslations("lobby");
  const routeParams = useParams<{locale: string}>();
  const locale = routeParams?.locale ?? "en";
  const {data: session} = useSession();

  const player = useMemo<PlayerPublic>(
    () => ({
      id: session?.user?.id ?? "guest",
      name: session?.user?.name ?? "Guest",
      image: session?.user?.image ?? null,
      level: 1,
    }),
    [session]
  );

  const [room, setRoom] = useState<RoomState | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [text, setText] = useState("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(({roomCode}) => setRoomCode(roomCode.toUpperCase().trim()));
  }, [params]);

  useEffect(() => {
    if (!roomCode) return;
    let mounted = true;
    let socket: Socket | null = null;
    let onRoomUpdate: ((nextRoom: RoomState) => void) | null = null;
    let onChatMessage: ((msg: ChatMsg) => void) | null = null;
    let onRoomError: ((p: {message: string}) => void) | null = null;

    getSocket().then((s) => {
      if (!mounted) return;
      socket = s;

      // attempt join (safe for direct page open)
      s.emit("room:join", {roomCode, player});

      onRoomUpdate = (nextRoom: RoomState) => {
        if (nextRoom.roomCode === roomCode) setRoom(nextRoom);
      };

      onChatMessage = (msg: ChatMsg) => {
        setMessages((prev) => [...prev, msg].slice(-200));
      };

      onRoomError = ({message}: {message: string}) => setError(message);

      s.on("room:update", onRoomUpdate);
      s.on("chat:message", onChatMessage);
      s.on("room:error", onRoomError);
    });

    return () => {
      mounted = false;
      if (!socket) return;
      if (onRoomUpdate) socket.off("room:update", onRoomUpdate);
      if (onChatMessage) socket.off("chat:message", onChatMessage);
      if (onRoomError) socket.off("room:error", onRoomError);
    };
  }, [player, roomCode]);

  async function send() {
    const message = text.trim();
    if (!message) return;
    setText("");
    const s = await getSocket();
    s.emit("chat:send", {roomCode, message, player});
  }

  return (
    <section className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("title")} · {roomCode}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {room
              ? `${room.players.length}/${room.playerCount} ${t("players").toLowerCase()}`
              : "Loading..."}
          </p>
          {error ? (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border p-5 lg:col-span-1">
          <div className="text-sm font-semibold">{t("players")}</div>
          <div className="mt-3 grid gap-2">
            {(room?.players ?? []).map((p) => (
              <div
                key={`${p.id}-${p.name}`}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-700">
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="font-medium">{p.name}</div>
                </div>
                <div className="text-xs text-zinc-500">Lv {p.level ?? 1}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-zinc-500">
            O‘yin logikasi (kun/tun, ovoz berish) keyingi bosqichda shu lobby ichida
            “Start game” bilan ishga tushadi.
          </div>
        </div>

        <div className="rounded-xl border p-5 lg:col-span-2">
          <div className="text-sm font-semibold">{t("chat")}</div>
          <div className="mt-3 h-80 overflow-auto rounded-lg border bg-zinc-50 p-3 text-sm dark:bg-zinc-950">
            {messages.length === 0 ? (
              <div className="text-zinc-500">
                Hozircha chat bo‘sh. Birinchi bo‘lib yozing.
              </div>
            ) : (
              <div className="grid gap-2">
                {messages.map((m) => (
                  <div key={m.id} className="rounded-md bg-white p-2 dark:bg-zinc-900">
                    <div className="text-xs text-zinc-500">{m.player.name}</div>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message..."
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/20 dark:bg-zinc-950"
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button
              onClick={send}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
