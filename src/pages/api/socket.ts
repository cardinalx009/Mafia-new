import type {NextApiRequest} from "next";
import type {NextApiResponse} from "next";
import {Server as IOServer} from "socket.io";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NextApiResponse["socket"] & {
    server: NextApiResponse["socket"]["server"] & {
      io?: IOServer;
    };
  };
};

type PlayerPublic = {
  id: string;
  name: string;
  image?: string | null;
  level?: number;
};

type RoomStatePublic = {
  roomCode: string;
  playerCount: number;
  players: PlayerPublic[];
};

type RoomPlayer = {
  socketId: string;
  player: PlayerPublic;
};

type RoomStateInternal = {
  roomCode: string;
  playerCount: number;
  players: RoomPlayer[];
};

// In-memory state (for MVP). For production: Redis.
const matchmakingQueue = new Map<number, string[]>(); // playerCount -> socketIds
const rooms = new Map<string, RoomStateInternal>();

function toPublicRoom(room: RoomStateInternal): RoomStatePublic {
  return {
    roomCode: room.roomCode,
    playerCount: room.playerCount,
    players: room.players.map((p) => p.player),
  };
}

function randomCode(len = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("matchmaking:find", ({playerCount, player}: {playerCount: number; player: PlayerPublic}) => {
        const count = Math.max(4, Math.min(12, Number(playerCount || 4)));
        socket.data.player = player;
        const q = matchmakingQueue.get(count) ?? [];
        q.push(socket.id);
        matchmakingQueue.set(count, q);

        // When enough players found -> create room
        if (q.length >= count) {
          const taken = q.splice(0, count);
          matchmakingQueue.set(count, q);

          const roomCode = randomCode();
          const room: RoomStateInternal = {roomCode, playerCount: count, players: []};
          rooms.set(roomCode, room);

          taken.forEach((sid) => {
            const s = io.sockets.sockets.get(sid);
            if (!s) return;
            s.join(roomCode);
            const p = (s.data.player as PlayerPublic | undefined) ?? player;
            room.players.push({socketId: sid, player: p});
            s.emit("match:found", {roomCode});
          });

          io.to(roomCode).emit("room:update", toPublicRoom(room));
        } else {
          socket.emit("matchmaking:queued", {playerCount: count, queued: q.length});
        }
      });

      socket.on("room:create", ({playerCount, player}: {playerCount: number; player: PlayerPublic}) => {
        const count = Math.max(4, Math.min(12, Number(playerCount || 4)));
        const roomCode = randomCode();
        socket.data.player = player;
        const room: RoomStateInternal = {roomCode, playerCount: count, players: [{socketId: socket.id, player}]};
        rooms.set(roomCode, room);
        socket.join(roomCode);
        socket.emit("room:created", {roomCode});
        io.to(roomCode).emit("room:update", toPublicRoom(room));
      });

      socket.on("room:join", ({roomCode, player}: {roomCode: string; player: PlayerPublic}) => {
        const code = String(roomCode || "").toUpperCase().trim();
        const room = rooms.get(code);
        if (!room) {
          socket.emit("room:error", {message: "Room not found"});
          return;
        }
        if (room.players.length >= room.playerCount) {
          socket.emit("room:error", {message: "Room is full"});
          return;
        }
        if (room.players.some((p) => p.socketId === socket.id)) return;
        socket.data.player = player;
        socket.join(code);
        room.players.push({socketId: socket.id, player});
        io.to(code).emit("room:update", toPublicRoom(room));
      });

      socket.on("chat:send", ({roomCode, message, player}: {roomCode: string; message: string; player: PlayerPublic}) => {
        const code = String(roomCode || "").toUpperCase().trim();
        const text = String(message || "").slice(0, 500);
        if (!text) return;
        io.to(code).emit("chat:message", {
          id: crypto.randomUUID(),
          text,
          player,
          at: Date.now(),
        });
      });

      socket.on("disconnect", () => {
        // Simple cleanup: remove from queues
        for (const [count, q] of matchmakingQueue.entries()) {
          const idx = q.indexOf(socket.id);
          if (idx !== -1) q.splice(idx, 1);
          matchmakingQueue.set(count, q);
        }

        for (const room of rooms.values()) {
          const before = room.players.length;
          room.players = room.players.filter((p) => p.socketId !== socket.id);
          if (room.players.length !== before) {
            if (room.players.length === 0) {
              rooms.delete(room.roomCode);
            } else {
              io.to(room.roomCode).emit("room:update", toPublicRoom(room));
            }
          }
        }
      });
    });
  }

  res.end();
}
