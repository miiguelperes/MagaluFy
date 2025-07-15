import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export interface SpotifyRequest extends Request {
  spotifyToken?: string;
}

export async function spotifyAuthMiddleware(req: SpotifyRequest, res: Response, next: NextFunction) {
  let access_token = req.cookies.access_token;
  let refresh_token = req.cookies.refresh_token;

  if (!access_token) {
    return res.status(401).json({ error: 'Token de acesso não encontrado' });
  }

  try {
    // Testar se o token atual é válido
    await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    req.spotifyToken = access_token;
    next();
  } catch (err: any) {
    if (err.response?.status === 401 && refresh_token) {
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
      
      req.spotifyToken = access_token;
      next();
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
} 