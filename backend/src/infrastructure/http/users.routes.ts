import { Router } from 'express';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case.js';

const getUsers = new GetUsersUseCase();
export const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  res.json(await getUsers.execute());
});
