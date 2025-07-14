import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Listar playlists do usuário
router.get('/', async (req, res) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
      },
    });
    res.json(data);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao buscar playlists' });
  }
});

// Criar nova playlist
router.post('/', async (req, res) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.status(401).json({ error: 'Não autenticado' });
  const { name, description = '', isPublic = true } = req.body;
  try {
    // Buscar o ID do usuário
    const userRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
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
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    res.status(201).json(data);
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: 'Erro ao criar playlist' });
  }
});

export default router; 