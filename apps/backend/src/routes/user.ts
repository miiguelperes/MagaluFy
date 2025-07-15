import { Router } from 'express';
import axios from 'axios';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';

const router = Router();

router.get('/me', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${req.spotifyToken}` },
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 