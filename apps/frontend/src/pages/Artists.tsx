import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 24px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ArtistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #222;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.1rem;
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

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/artists/top?limit=${LIMIT}&offset=${offset}`);
      setArtists(data.items);
      setTotal(data.total);
    } catch {
      setArtists([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchArtists();
    // eslint-disable-next-line
  }, [user, offset]);

  if (loading || isLoading) return <Container>Carregando...</Container>;
  if (!user) return <Container>Faça login para ver seus artistas.</Container>;

  return (
    <Container>
      <Title>Top Artistas</Title>
      <List>
        {artists.map((artist) => (
          <Link to={`/artists/${artist.id}/albums`} key={artist.id} style={{ textDecoration: 'none' }}>
            <ArtistItem>
              <Avatar src={artist.images[0]?.url || ''} alt={artist.name} />
              <Name>{artist.name}</Name>
            </ArtistItem>
          </Link>
        ))}
      </List>
      <Pagination>
        <Button onClick={() => setOffset((o) => Math.max(0, o - LIMIT))} disabled={offset === 0}>
          Anterior
        </Button>
        <Button
          onClick={() => setOffset((o) => o + LIMIT)}
          disabled={offset + LIMIT >= total}
        >
          Próxima
        </Button>
      </Pagination>
    </Container>
  );
};

export default Artists; 