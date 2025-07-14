import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

const AlbumItem = styled.li`
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

const Back = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-bottom: 24px;
  display: inline-block;
`;

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

const ArtistAlbums: React.FC = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/albums/${artistId}/albums`);
        setAlbums(data.items);
      } catch {
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (artistId) fetchAlbums();
  }, [artistId]);

  if (isLoading) return <Container>Carregando...</Container>;

  return (
    <Container>
      <Back to="/artists">← Voltar</Back>
      <Title>Álbuns</Title>
      <List>
        {albums.map((album) => (
          <AlbumItem key={album.id}>
            <Cover src={album.images[0]?.url || ''} alt={album.name} />
            <Name>{album.name}</Name>
          </AlbumItem>
        ))}
      </List>
    </Container>
  );
};

export default ArtistAlbums; 