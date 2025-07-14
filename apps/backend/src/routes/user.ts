import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/me', async (req, res) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(data);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao buscar dados do usuário' });
  }
});

export default router; 