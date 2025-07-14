import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 24px;
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
  float: right;
  margin-bottom: 24px;
  &:hover {
    background: #1ed760;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Cover = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  background: #333;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.1rem;
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
  background: #181818;
  border-radius: 16px;
  padding: 32px 40px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: none;
  margin-bottom: 24px;
  width: 100%;
  font-size: 1rem;
`;

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Playlists: React.FC = () => {
  const { user, loading } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/playlists');
      setPlaylists(data.items);
    } catch {
      setPlaylists([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPlaylists();
    // eslint-disable-next-line
  }, [user]);

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

  if (loading || isLoading) return <Container>Carregando...</Container>;
  if (!user) return <Container>Faça login para ver suas playlists.</Container>;

  return (
    <Container>
      <Title>Minhas Playlists</Title>
      <Button onClick={() => setShowModal(true)}>Criar playlist</Button>
      <List>
        {playlists.map((playlist) => (
          <PlaylistItem key={playlist.id}>
            <Cover src={playlist.images[0]?.url || ''} alt={playlist.name} />
            <Name>{playlist.name}</Name>
          </PlaylistItem>
        ))}
      </List>
      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <h3>Digite o nome da nova playlist:</h3>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Minha playlist #1"
              disabled={creating}
            />
            <Button onClick={handleCreate} disabled={creating || !newName}>
              {creating ? 'Criando...' : 'Criar'}
            </Button>
            <Button onClick={() => setShowModal(false)} style={{ background: '#444', marginTop: 8 }}>
              Cancelar
            </Button>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Playlists; 