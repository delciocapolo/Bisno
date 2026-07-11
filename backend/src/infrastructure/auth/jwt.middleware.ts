import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import env from '@src/config/env';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const request = req as Request & { user?: unknown };
    request.user = jwt.verify(token, process.env.JWT_SECRET || env("JWT_SECRET"));
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


// Fluxo
// 1. O cliente envia uma requisição para o servidor com um token JWT no cabeçalho [Authorization].
// 2. O middleware jwtMiddleware é chamado antes do manipulador de rota.
// 3. O middleware extrai o token JWT do cabeçalho [Authorization].
// 4. O middleware verifica se o token está presente. Se não estiver, retorna uma resposta [401 Unauthorized].
// 5. O middleware tenta verificar a validade do token usando a chave secreta (JWT_SECRET); se o usuario existe.
// 6. Se o token for válido, o middleware adiciona as informações do usuário decodificadas à requisição (req.user) e chama next() para passar para o próximo manipulador de rota.
// 7. Se o token for inválido, retorna uma resposta [401 Unauthorized].