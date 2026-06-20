import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { clerkAuth } from '../../infra/auth/clerk.middleware.js';
import { setupSwagger } from '../swagger/setup.js';
import { healthRouter } from '@src/infrastructure/http/health.routes.js';
import { userRoutes } from './routes/users/index.js';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(clerkAuth);

// routes
setupSwagger(server);
server.use(userRoutes);
server.use(healthRouter);

export {
  server,
};
