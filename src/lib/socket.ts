"use client";

import {io, type Socket} from "socket.io-client";

let socket: Socket | null = null;

export async function getSocket() {
  if (socket) return socket;

  // Initialize the Socket.IO server (Next API route side-effect)
  await fetch("/api/socket");

  socket = io({
    path: "/api/socketio",
  });

  return socket;
}

