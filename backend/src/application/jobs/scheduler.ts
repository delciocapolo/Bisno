import Logger from "@src/infrastructure/pino/logger";
import { expiredLeadsTask } from "./task/expired-lead-task";

const scheduleLogger = Logger.publishTo({ context: "schedule" });

async function registerSchedulers(): Promise<void> {
  await expiredLeadsTask.execute();
}

export { scheduleLogger, registerSchedulers };
