import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/:artistId/albums', async (req, res) => {
  const access_token = req.cookies.access_token;
  const { artistId } = req.params;
  if (!access_token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
        include_groups: req.query.include_groups || 'album,single',
      },
    });
    res.json(data);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao buscar álbuns' });
  }
});

export default router; 