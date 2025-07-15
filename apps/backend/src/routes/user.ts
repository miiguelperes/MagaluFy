import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet } from '../utils/spotifyApi';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/me', spotifyAuthMiddleware, asyncHandler(async (req: SpotifyRequest, res) => {
  const data = await spotifyGet('https://api.spotify.com/v1/me', req);
  res.json(data);
}, 'buscar dados do usuário'));

export default router; 