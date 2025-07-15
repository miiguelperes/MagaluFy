import React, { useState } from 'react';
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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  color: #b3b3b3;
  font-size: 1.05rem;
  margin: 0 0 16px 0;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 24px;
  &:hover {
    background: #1ed760;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  width: 100%;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 10px 16px;
  width: 100%;
  min-height: 56px;
`;

const Cover = styled.img`
  width: 78px;
  height: 78px;
  object-fit: cover;
  background: #333;
`;

const CoverFallback = styled.div`
  width: 78px;
  height: 78px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
`;

const Description = styled.span`
  color: #b3b3b3;
  font-size: 0.98rem;
  margin-top: 2px;
  display: block;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #232323;
  border-radius: 32px;
  padding: 56px 56px 40px 56px;
  min-width: 480px;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 18px 0;
  text-align: center;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
`;

const ModalInput = styled.input`
  background: transparent;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 0;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  padding: 0;
  margin-bottom: 0;
  width: 100%;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  &::placeholder {
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    opacity: 1;
    text-align: center;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #444;
  margin: 18px 0 32px 0;
`;

const ModalButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  width: 180px;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  &:hover {
    background: #1ed760;
  }
  &:disabled {
    background: #535353;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: none;
  color: #b3b3b3;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #fff;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  &:hover svg {
    stroke: #1ed760;
  }
`;

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  description?: string;
}

const LIMIT = 8;

const Playlists: React.FC = () => {
  const { user, loading } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const endRef = React.useRef<HTMLDivElement | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchPlaylists = async (nextOffset = 0, append = false) => {
    const cacheKey = `playlists-page-${nextOffset}`;
    let data;
    // Tenta buscar do cache se offline
    try {
      if (!navigator.onLine) {
        data = await get(cacheKey);
      }
    } catch {}
    if (!data) {
      try {
        const res = await axios.get(`/api/playlists?limit=${LIMIT}&offset=${nextOffset}`);
        data = res.data;
        set(cacheKey, data);
      } catch {
        data = await get(cacheKey);
      }
    }
    if (data) {
      setPlaylists(prev => append ? [...prev, ...data.items] : data.items);
      setTotal(data.total || data.items.length);
      setOffset(nextOffset);
    } else if (!append) {
      setPlaylists([]);
    }
    if (nextOffset !== 0) setIsFetchingMore(false);
    else setIsLoading(false);
  };

  React.useEffect(() => {
    if (user) fetchPlaylists(0, false);
    // eslint-disable-next-line
  }, [user]);

  const loadMore = React.useCallback(() => {
    if (playlists.length < total && !isFetchingMore && !isLoading) {
      fetchPlaylists(offset + LIMIT, true);
    }
  }, [playlists.length, total, isFetchingMore, isLoading, offset]);

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
  }, [loadMore, playlists.length, total, isFetchingMore, isLoading]);

  const handleCreate = async () => {
    if (!newName) return;
    setCreating(true);
    try {
      await axios.post('/api/playlists', { name: newName });
      setShowModal(false);
      setNewName('');
      fetchPlaylists();
    } finally {
      setCreating(false);
    }
  };

  if (loading || isLoading) return <Loader />;
  if (!user) return <Container>Faça login para ver suas playlists.</Container>;

  return (
    <Container>
      <TitleRow>
        <Title>Minhas Playlists</Title>
        <Button onClick={() => setShowModal(true)}>Criar playlist</Button>
      </TitleRow>
      <Subtitle>Sua coleção pessoal de playlists</Subtitle>
      <List>
        {playlists.map((playlist) => (
          <PlaylistItem key={playlist.id}>
            {playlist.images?.[0]?.url ? (
              <Cover src={playlist.images[0].url} alt={playlist.name} />
            ) : (
              <CoverFallback>
                {playlist.name?.[0] || '?'}
              </CoverFallback>
            )}
            <Info>
              <Name>{playlist.name}</Name>
              <Description>{playlist.description?.trim() ? playlist.description : 'Sem Etiqueta'}</Description>
            </Info>
          </PlaylistItem>
        ))}
      </List>
      <div ref={endRef} style={{ height: 1 }} />
      {isFetchingMore && <Loader />}
      {showModal && (
        <ModalOverlay
          tabIndex={-1}
          onClick={e => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <ModalBox
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Escape') setShowModal(false);
            }}
          >
            <CloseButton onClick={() => setShowModal(false)} aria-label="Fechar modal">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7L21 21M21 7L7 21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </CloseButton>
            <ModalTitle>Dê um nome a sua playlist</ModalTitle>
            <ModalInput
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Minha playlist #1"
              disabled={creating}
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter' && newName && !creating) {
                  handleCreate();
                }
              }}
            />
            <Divider />
            <ModalButton onClick={handleCreate} disabled={creating || !newName}>
              {creating ? 'Criando...' : 'Criar'}
            </ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Playlists; 