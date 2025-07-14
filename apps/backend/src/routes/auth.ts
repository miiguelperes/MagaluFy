import { Router } from 'express';
import axios from 'axios';
import querystring from 'querystring';

const router = Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
];

router.get('/login', (req, res) => {
  const params = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    redirect_uri: REDIRECT_URI,
    state: Math.random().toString(36).substring(2, 15),
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('Código não informado');
  try {
    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const { access_token, refresh_token, expires_in } = tokenRes.data;
    res.cookie('access_token', access_token, { httpOnly: true, maxAge: expires_in * 1000 });
    res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.redirect(FRONTEND_URL);
  } catch (err) {
    res.status(500).send('Erro ao autenticar com o Spotify');
  }
});

router.get('/refresh', async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) return res.status(401).send('Refresh token não encontrado');
  try {
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
    const { access_token, expires_in } = tokenRes.data;
    res.cookie('access_token', access_token, { httpOnly: true, maxAge: expires_in * 1000 });
    res.json({ access_token });
  } catch (err) {
    res.status(500).send('Erro ao renovar token');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.redirect(FRONTEND_URL);
});

export default router; 