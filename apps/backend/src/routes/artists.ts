import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet, handleSpotifyError } from '../utils/spotifyApi';

const router = Router();

router.get('/top', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const data = await spotifyGet('https://api.spotify.com/v1/me/top/artists', req, {
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0,
    });
    res.json(data);
  } catch (error) {
    handleSpotifyError(error, 'buscar artistas top');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 