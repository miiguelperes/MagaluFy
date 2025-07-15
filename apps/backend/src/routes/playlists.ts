import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

async function trySpotifyRequest(req: Request, res: Response, fn: (access_token: string) => Promise<any>) {
  let access_token = req.cookies.access_token;
  let refresh_token = req.cookies.refresh_token;
  try {
    return await fn(access_token);
  } catch (err: any) {
    if (err.response?.status === 401 && refresh_token) {
      try {
        const axios = require('axios');
        const querystring = require('querystring');
        const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
        const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
        const tokenRes = await axios.post(
          'https://accounts.spotify.com/api/token',
          querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        access_token = tokenRes.data.access_token;
        res.cookie('access_token', access_token, {
          httpOnly: true,
          maxAge: tokenRes.data.expires_in * 1000,
          sameSite: 'lax',
          secure: false,
          path: '/',
        });
        return await fn(access_token);
      } catch (refreshErr) {
        return res.status(401).json({ error: 'Não autenticado (refresh falhou)' });
      }
    }
    throw err;
  }
}

// Listar playlists do usuário
router.get('/', async (req, res) => {
  await trySpotifyRequest(req, res, async (access_token) => {
    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
      },
    });
    res.json(data);
  });
});

// Criar nova playlist
router.post('/', async (req, res) => {
  await trySpotifyRequest(req, res, async (access_token) => {
    const { name, description = '', isPublic = true } = req.body;
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
  });
});

export default router; 