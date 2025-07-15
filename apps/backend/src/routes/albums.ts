import { Router } from 'express';
import { spotifyAuthMiddleware, SpotifyRequest } from '../middleware/spotifyAuth';
import { spotifyGet, handleSpotifyError } from '../utils/spotifyApi';

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

    const data = await spotifyGet(`https://api.spotify.com/v1/artists/${artistId}/albums`, req, {
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0,
      include_groups: req.query.include_groups as string || 'album,single',
    });
    res.json(data);
  } catch (error) {
    handleSpotifyError(error, 'buscar álbuns do artista');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 