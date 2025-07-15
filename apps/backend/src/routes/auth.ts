import { Router } from 'express';
import axios from 'axios';

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
  try {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      redirect_uri: REDIRECT_URI,
      state: Math.random().toString(36).substring(2, 15),
    });
    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.get('/callback', async (req, res) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).send('Código não informado');
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in } = tokenRes.data;
    
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: expires_in * 1000,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    
    res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error('Erro no callback:', error);
    res.status(500).send('Erro ao autenticar com o Spotify');
  }
});

router.get('/refresh', async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return res.status(401).send('Refresh token não encontrado');
    }

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, expires_in } = tokenRes.data;
    res.cookie('access_token', access_token, { 
      httpOnly: true, 
      maxAge: expires_in * 1000,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    res.json({ access_token });
  } catch (error) {
    console.error('Erro no refresh:', error);
    res.status(500).send('Erro ao renovar token');
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

export default router; 