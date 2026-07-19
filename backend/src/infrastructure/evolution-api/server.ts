import env from "@src/config/env";
import { io as SocketClient } from "socket.io-client";

const evolutionSocket = SocketClient(env("SERVER_URL"), {
  auth: { apiKey: env("AUTHENTICATION_API_KEY") },
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 8,
  reconnectionDelay: 3000,
  timeout: 10000,
});

console.log("Log: ", env("SERVER_URL"), env("AUTHENTICATION_API_KEY"));

evolutionSocket.on("connect", () => {
  console.log("✅ Successfully connected to Evolution API WebSocket");
});

evolutionSocket.on("connect_error", (err: any) => {
  console.error("❌ Evolution Connection Error:", {
    message: err.message,
    description: err.description,
    type: err.type,
    data: err.data,
  });
});

evolutionSocket.on("disconnect", (reason) => {
  console.warn("⚠️ Evolution disconnected:", reason);
});
