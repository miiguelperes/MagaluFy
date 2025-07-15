import axios, { AxiosRequestConfig } from 'axios';
import { SpotifyRequest } from '../middleware/spotifyAuth';

export interface SpotifyApiParams {
  limit?: number;
  offset?: number;
  include_groups?: string;
}

export function createSpotifyHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function spotifyGet<T = any>(
  url: string, 
  req: SpotifyRequest, 
  params?: SpotifyApiParams
): Promise<T> {
  const config: AxiosRequestConfig = {
    headers: createSpotifyHeaders(req.spotifyToken!),
  };
  
  if (params) {
    config.params = {
      limit: params.limit || 10,
      offset: params.offset || 0,
      ...(params.include_groups && { include_groups: params.include_groups }),
    };
  }
  
  const { data } = await axios.get(url, config);
  return data;
}

export async function spotifyPost<T = any>(
  url: string, 
  req: SpotifyRequest, 
  body: any
): Promise<T> {
  const { data } = await axios.post(url, body, {
    headers: createSpotifyHeaders(req.spotifyToken!),
  });
  return data;
}

export function handleSpotifyError(error: any, operation: string) {
  console.error(`Erro ao ${operation}:`, error);
  throw new Error(`Erro interno do servidor`);
} 