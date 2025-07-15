import { Router, Response } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet } from '../utils/spotifyApi';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/top', spotifyAuthMiddleware, asyncHandler(async (req: SpotifyRequest, res: Response) => {
  const data = await spotifyGet('https://api.spotify.com/v1/me/top/artists', req, {
    limit: Number(req.query.limit) || 10,
    offset: Number(req.query.offset) || 0,
  });
  res.json(data);
}, 'buscar artistas top'));

export default router; 