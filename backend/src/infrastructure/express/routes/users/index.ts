import { jwtMiddleware } from "@src/infrastructure/auth/jwt.middleware";
import type express from "express";
import { Router } from "express";

const userRoutes = Router();

const usersHandler = async (_req: express.Request, res: express.Response) => {
  const users = await Promise.resolve([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  res.json(users);
};

userRoutes.get("/", jwtMiddleware, usersHandler);

export { userRoutes };
