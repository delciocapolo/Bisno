import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case.js';
import { initSequelize } from './infra/sequelize/sequelize.js';
import { setupSwagger } from './infra/swagger/setup.js';
import { clerkAuth, requireClerkAuth } from './infra/auth/clerk.middleware.js';

async function bootstrap() {
  await initSequelize();

  const app = express();
  const getUsers = new GetUsersUseCase();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(clerkAuth);
  setupSwagger(app);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'backend', architecture: 'clean' });
  });

  const usersHandler = async (_req: express.Request, res: express.Response) => {
    const users = await getUsers.execute();
    res.json(users);
  };

  app.get('/api/users', requireClerkAuth, usersHandler);

  const port = process.env.PORT ?? 3000;
  app.listen(port, () => console.log(`🚀 backend (clean) on :${port}`));
}

bootstrap();
