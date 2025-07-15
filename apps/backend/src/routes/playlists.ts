import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet, spotifyPost, handleSpotifyError } from '../utils/spotifyApi';

const router = Router();

// Listar playlists do usuário
router.get('/', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const data = await spotifyGet('https://api.spotify.com/v1/me/playlists', req, {
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0,
    });
    res.json(data);
  } catch (error) {
    handleSpotifyError(error, 'buscar playlists');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar nova playlist
router.post('/', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
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
  } catch (error) {
    handleSpotifyError(error, 'criar playlist');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 