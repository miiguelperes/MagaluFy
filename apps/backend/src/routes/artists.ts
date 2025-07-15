import { Router } from 'express';
import axios from 'axios';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';

const router = Router();

router.get('/top', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${req.spotifyToken}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar artistas top:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 