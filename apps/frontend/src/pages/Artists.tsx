import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { get, set } from 'idb-keyval';

const Container = styled.div`
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  margin-top: 0;
`;

const Subtitle = styled.p`
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-top: 0;
  margin-bottom: 32px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ArtistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  transition: background 0.2s;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #222;
  }
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
  border: 2px solid #222;
`;

const AvatarFallback = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #222;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.15rem;
  font-weight: 500;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: #444;
    cursor: not-allowed;
  }
`;

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const LIMIT = 8;

const Artists: React.FC = () => {
  const { user, loading } = useAuth();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const fetchArtists = async (nextOffset = 0, append = false) => {
    const cacheKey = `artists-page-${nextOffset}`;
    let fromCache = false;
    let data;
    // Tenta buscar do cache primeiro
    try {
      if (!navigator.onLine) {
        data = await get(cacheKey);
        fromCache = true;
      }
    } catch {}
    if (!data) {
      try {
        const res = await axios.get(`/api/artists/top?limit=${LIMIT}&offset=${nextOffset}`);
        data = res.data;
        // Salva no cache
        set(cacheKey, data);
      } catch {
        // Se falhar online, tenta cache como fallback
        data = await get(cacheKey);
        fromCache = true;
      }
    }
    if (data) {
      setArtists(prev => append ? [...prev, ...data.items] : data.items);
      setTotal(data.total);
      setOffset(nextOffset);
    } else if (!append) {
      setArtists([]);
    }
    if (nextOffset !== 0) setIsFetchingMore(false);
    else setIsLoading(false);
  };

  useEffect(() => {
    if (user) fetchArtists(0, false);
    // eslint-disable-next-line
  }, [user]);

  const loadMore = useCallback(() => {
    if (artists.length < total && !isFetchingMore && !isLoading) {
      fetchArtists(offset + LIMIT, true);
    }
  }, [artists.length, total, isFetchingMore, isLoading, offset]);

  useEffect(() => {
    if (!endRef.current) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 1 });
    observer.current.observe(endRef.current);
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMore, artists.length, total, isFetchingMore, isLoading]);

  if (loading || isLoading) return <Loader />;
  if (!user) return <Container>Faça login para ver seus artistas.</Container>;

  return (
    <Container>
      <Title>Top Artistas</Title>
      <Subtitle>Aqui você encontra seus artistas preferidos</Subtitle>
      <List>
        {artists.map((artist) => (
          <Link
            to={`/artists/${artist.id}/albums`}
            state={{ artistName: artist.name }}
            style={{ textDecoration: 'none' }}
            key={artist.id}
          >
            <ArtistItem>
              {artist.images?.[0]?.url ? (
                <Avatar src={artist.images[0].url} alt={artist.name} />
              ) : (
                <AvatarFallback>
                  {artist.name?.[0] || '?'}
                </AvatarFallback>
              )}
              <Name>{artist.name}</Name>
            </ArtistItem>
          </Link>
        ))}
      </List>
      <div ref={endRef} style={{ height: 1 }} />
      {isFetchingMore && <Loader />}
    </Container>
  );
};

export default Artists; 