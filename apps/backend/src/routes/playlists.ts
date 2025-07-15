import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet, spotifyPost } from '../utils/spotifyApi';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Listar playlists do usuário
router.get('/', spotifyAuthMiddleware, asyncHandler(async (req: SpotifyRequest, res) => {
  const data = await spotifyGet('https://api.spotify.com/v1/me/playlists', req, {
    limit: Number(req.query.limit) || 10,
    offset: Number(req.query.offset) || 0,
  });
  res.json(data);
}, 'buscar playlists'));

// Criar nova playlist
router.post('/', spotifyAuthMiddleware, asyncHandler(async (req: SpotifyRequest, res) => {
  const { name, description = '', isPublic = true } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Nome da playlist é obrigatório' });
  }
  
  // Buscar o ID do usuário
  const userData = await spotifyGet('https://api.spotify.com/v1/me', req);
  const userId = userData.id;
  
  // Criar playlist
  const data = await spotifyPost(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    req,
    {
      name,
      description,
      public: isPublic,
    }
  );
  res.status(201).json(data);
}, 'criar playlist'));

export default router; 