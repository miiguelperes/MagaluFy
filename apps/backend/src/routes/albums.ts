import { Router } from 'express';
import axios from 'axios';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';

const router = Router();

// Função para validar e sanitizar o artistId
function validateArtistId(artistId: string): boolean {
  // Spotify artist IDs são alfanuméricos com 22 caracteres
  const spotifyIdRegex = /^[a-zA-Z0-9]{22}$/;
  return spotifyIdRegex.test(artistId);
}

router.get('/:artistId/albums', spotifyAuthMiddleware, async (req: SpotifyRequest, res) => {
  try {
    const { artistId } = req.params;
    
    // Validar o artistId antes de usar na URL
    if (!validateArtistId(artistId)) {
      return res.status(400).json({ error: 'ID do artista inválido' });
    }

    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: { Authorization: `Bearer ${req.spotifyToken}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
        include_groups: req.query.include_groups || 'album,single',
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar álbuns do artista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 