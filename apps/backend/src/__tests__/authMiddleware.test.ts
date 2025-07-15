import { Request, Response, NextFunction } from 'express';

// Exemplo de middleware de autenticação
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.access_token) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  next();
}

describe('authMiddleware', () => {
  it('deve retornar 401 se não houver access_token', () => {
    const req = { cookies: {} } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Não autenticado' });
    expect(next).not.toHaveBeenCalled();
  });
}); 