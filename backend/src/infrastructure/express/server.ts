import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { clerkAuth } from '../auth/clerk.middleware.js';
import { setupSwagger } from '../swagger/setup.js';
import { userRoutes } from './routes/users/index.js';
import { healthRoutes } from './routes/health/index.js';
import { bisnoRoutes } from './routes/create-bisno/index.js';
import Logger from '../pino/logger.js';

const server = express();
const serverLogger = Logger.publishTo({ context: "server" });

server.use(cors());
server.use(helmet());
server.use(clerkAuth);
server.use(express.json());

// routes
setupSwagger(server);
server.use(userRoutes);
server.use(bisnoRoutes);
server.use(healthRoutes);

export {
  server,
  serverLogger,
};
