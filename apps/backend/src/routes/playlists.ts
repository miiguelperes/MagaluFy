import { Router } from 'express';
import axios from 'axios';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';

const router = Router();

// Listar playlists do usuário
router.get('/', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${req.spotifyToken}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
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
    const userRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${req.spotifyToken}` },
    });
    const userId = userRes.data.id;
    
    // Criar playlist
    const { data } = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name,
        description,
        public: isPublic,
      },
      {
        headers: { Authorization: `Bearer ${req.spotifyToken}` },
      }
    );
    res.status(201).json(data);
  } catch (error) {
    console.error('Erro ao criar playlist:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 