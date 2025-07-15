import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet, handleSpotifyError } from '../utils/spotifyApi';

const router = Router();

router.get('/me', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const data = await spotifyGet('https://api.spotify.com/v1/me', req);
    res.json(data);
  } catch (error) {
    handleSpotifyError(error, 'buscar dados do usuário');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 