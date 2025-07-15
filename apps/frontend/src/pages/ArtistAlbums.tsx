import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import { get, set } from 'idb-keyval';

const Container = styled.div`
  margin: 0px auto 40px auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const Back = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
  height: 30px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: left;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
  width: 100%;
`;

const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  background: #181818;
  border-radius: 16px;
  padding: 18px 24px;
  width: 100%;
  min-height: 80px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
`;

const Cover = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  background: #333;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  line-height: 1.2;
  word-break: break-word;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  justify-content: space-between;
  width: 100%;
  height: 60px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid #222;
  background: #222;
`;

const UserAvatarFallback = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
  border: 2.5px solid #222;
`;

const ArtistName = styled.span`
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  text-align: left;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const AlbumDate = styled.span`
  color: #aaa;
  font-size: 0.98rem;
  font-weight: 400;
  margin-top: 4px;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
`;

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date?: string;
}

const LIMIT = 8;

const ArtistAlbums: React.FC = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const endRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const artistName = location.state?.artistName || '';
  const { user } = useAuth();

  const fetchAlbums = async (nextOffset = 0, append = false) => {
    if (!artistId) return;
    const cacheKey = `albums-${artistId}-page-${nextOffset}`;
    let data;
    try {
      if (!navigator.onLine) {
        data = await get(cacheKey);
      }
    } catch {}
    if (!data) {
      try {
        const res = await axios.get(`/api/albums/${artistId}/albums?limit=${LIMIT}&offset=${nextOffset}`);
        data = res.data;
        set(cacheKey, data);
      } catch {
        data = await get(cacheKey);
      }
    }
    if (data) {
      setAlbums(prev => append ? [...prev, ...data.items] : data.items);
      setTotal(data.total || data.items.length);
      setOffset(nextOffset);
    } else if (!append) {
      setAlbums([]);
    }
    if (nextOffset !== 0) setIsFetchingMore(false);
    else setIsLoading(false);
  };

  React.useEffect(() => {
    if (artistId) fetchAlbums(0, false);
    // eslint-disable-next-line
  }, [artistId]);

  const loadMore = React.useCallback(() => {
    if (albums.length < total && !isFetchingMore && !isLoading) {
      fetchAlbums(offset + LIMIT, true);
    }
  }, [albums.length, total, isFetchingMore, isLoading, offset, artistId]);

  React.useEffect(() => {
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
  }, [loadMore, albums.length, total, isFetchingMore, isLoading]);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Back to="/artists" aria-label="Voltar para artistas">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 24L8 14L18 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Back>
          <ArtistName>{artistName}</ArtistName>
        </HeaderLeft>
        {user && (
          user.images?.[0]?.url ? (
            <UserAvatar src={user.images[0].url} alt={user.display_name} />
          ) : (
            <UserAvatarFallback>
              {user.display_name?.[0] || '?'}
            </UserAvatarFallback>
          )
        )}
      </Header>
      <List>
        {albums.map((album) => (
          <AlbumItem key={album.id}>
            <Cover src={album.images[0]?.url || 'about:blank'} alt={album.name} />
            <AlbumInfo>
              <Name>{album.name}</Name>
              {album.release_date && (
                <AlbumDate>{new Date(album.release_date).toLocaleDateString('pt-BR')}</AlbumDate>
              )}
            </AlbumInfo>
          </AlbumItem>
        ))}
      </List>
      <div ref={endRef} style={{ height: 1 }} />
      {isFetchingMore && <Loader />}
    </Container>
  );
};

export default ArtistAlbums; 