import { ROOMS } from "./rooms";
import { Server } from "socket.io";
import Logger from "../pino/logger";
import { server } from "../express/server";
import { computeUserIdFromHeaders } from "./utils";
import { bisnoMixeiroAcceptEvent } from "./listeners/bisno-mixeiro-accept.event";

const appSocket = new Server(server, {
  cors: { origin: "*" },
});
const socketLogger = Logger.publishTo({
  context: "socket",
});

// ============================================================

appSocket.on("connection", async (socket) => {
  console.log("ENTROU");
  const userId = computeUserIdFromHeaders(socket.handshake.auth);
  await socket.join(userId);

  socket.on(ROOMS.bisno.mixeiro.accept, bisnoMixeiroAcceptEvent);

  appSocket.to(userId).emit("foo", "Testando...");
});

export { appSocket, socketLogger };
