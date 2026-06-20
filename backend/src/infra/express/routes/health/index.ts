import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'backend', architecture: 'clean' });
});

export {
  healthRoutes
};
