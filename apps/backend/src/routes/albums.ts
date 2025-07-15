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
        const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
        const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
        const params = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
          client_id: CLIENT_ID || '',
          client_secret: CLIENT_SECRET || '',
        });
        const tokenRes = await axios.post(
          'https://accounts.spotify.com/api/token',
          params.toString(),
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

router.get('/:artistId/albums', async (req, res) => {
  await trySpotifyRequest(req, res, async (access_token) => {
    const { artistId } = req.params;
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        limit: req.query.limit || 10,
        offset: req.query.offset || 0,
        include_groups: req.query.include_groups || 'album,single',
      },
    });
    res.json(data);
  });
});

export default router; 