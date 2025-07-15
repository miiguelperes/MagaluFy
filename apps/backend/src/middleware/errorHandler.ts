import { Request, Response, NextFunction } from 'express';

export function errorHandler(operation: string) {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`Erro ao ${operation}:`, error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  };
}

export function asyncHandler(fn: Function, operation: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      errorHandler(operation)(error, req, res, next);
    }
  };
} 