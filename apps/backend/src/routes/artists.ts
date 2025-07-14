import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/top', async (req, res) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
      },
    });
    res.json(data);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao buscar artistas' });
  }
});

export default router; 