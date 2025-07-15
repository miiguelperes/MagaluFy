import request from 'supertest';
import app from '../app';

describe('GET /api/artists/top', () => {
  it('deve retornar 401 se não autenticado', async () => {
    const res = await request(app).get('/api/artists/top');
    expect(res.status).toBe(401);
  }, 15000); // timeout aumentado para 15s
}); 