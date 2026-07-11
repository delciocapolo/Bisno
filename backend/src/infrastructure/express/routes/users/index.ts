import { jwtMiddleware } from "@src/infrastructure/auth/jwt.middleware";
import express, { Router } from "express";

const userRoutes = Router();

const usersHandler = async (_req: express.Request, res: express.Response) => {
  const users = [{ id: 1, fullname: "Delcio Capolo" }];
  res.json(users);
};

userRoutes.get('/', jwtMiddleware, usersHandler);

export {
  userRoutes
};
