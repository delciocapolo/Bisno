import cron from "node-cron";
import Logger from "@src/infrastructure/pino/logger";
import { expiredLeadJob } from "./task/expired-lead.job";

const scheduleLogger = Logger.publishTo({ context: "schedule" });

const expiredLeadsTask = cron.schedule("*/1 * * * *", expiredLeadJob, {
  name: "expired-lead",
  timezone: "Africa/Luanda",
});

expiredLeadsTask.on("execution:started", (ctx) => {
  scheduleLogger.error(
    {
      schedule: {
        date: ctx.date,
        taskName: ctx.task?.name,
        triggeredAt: ctx.triggeredAt,
        dateLocalIso: ctx.dateLocalIso,
        taskStatus: ctx.task?.getStatus(),
        taskPattern: ctx.task?.getPattern(),
      },
    },
    "Schedule started",
  );
});

expiredLeadsTask.on("execution:failed", (ctx) => {
  scheduleLogger.error(
    { error: ctx.execution?.error?.message },
    "Error while run expired-lead task",
  );
});

export { scheduleLogger, expiredLeadsTask };
