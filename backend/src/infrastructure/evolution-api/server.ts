import env from "@src/config/env";
import { io as SocketClient } from "socket.io-client";
import { socketLogger } from "../socketio/server";

const evolutionSocket = SocketClient(env("SERVER_URL"), {
  auth: { apiKey: env("AUTHENTICATION_API_KEY") },
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionAttempts: 10,
  transports: ["websocket", "polling"],
});

// ============================================================

evolutionSocket.on("connect", () => {
  socketLogger.info("✅ Connected to Evolution API");
});

evolutionSocket.on("connect_error", (err) => {
  socketLogger.error("Evolution connection error:", err.message);
});

export { evolutionSocket };
