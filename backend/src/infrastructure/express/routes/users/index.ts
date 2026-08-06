import { jwtMiddleware } from "@src/infrastructure/auth/jwt.middleware";
import { IApiResponse } from "@src/shared/@types/api-response";
import type express from "express";
import { Router } from "express";

const userRoutes = Router();

const usersHandler = async (_req: express.Request, res: express.Response) => {
  const users = await Promise.resolve<IApiResponse>({
    data: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ],
    meta: { errors: null },
  });

  res.json(users);
};

userRoutes.get("/", jwtMiddleware, usersHandler);

export { userRoutes };
