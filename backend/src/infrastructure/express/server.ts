import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from '../swagger/setup.js';
import { userRoutes } from './routes/users/index.js';
import { healthRoutes } from './routes/health/index.js';
import { bisnoRoutes } from './routes/bisnos/index.js';
import Logger from '../pino/logger.js';

const server = express();
const serverLogger = Logger.publishTo({ context: "server" });

server.use(cors());
server.use(helmet());
server.use(express.json());

// routes
setupSwagger(server);
server.use('/api/users', userRoutes);
server.use('/api/bisnos', bisnoRoutes);
server.use('/api/health', healthRoutes);

export {
  server,
  serverLogger,
};
