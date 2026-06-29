import { requireClerkAuth } from "@src/infrastructure/auth/clerk.middleware.js";
import express, { Router } from "express";

const userRoutes = Router();

const usersHandler = async (_req: express.Request, res: express.Response) => {
  const users = [{ id: 1, fullname: "Delcio Capolo" }];
  res.json(users);
};

userRoutes.get('/', requireClerkAuth, usersHandler);

export {
  userRoutes
};
