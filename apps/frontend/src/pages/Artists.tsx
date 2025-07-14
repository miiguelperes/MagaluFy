import React from 'react';
import styled from 'styled-components';

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
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
`;

const Name = styled.span`
  color: #fff;
  font-size: 1.1rem;
`;

const mockArtists = [
  { id: 1, name: 'Black Alien' },
  { id: 2, name: 'Racionais MCs' },
  { id: 3, name: 'Djonga' },
  { id: 4, name: 'MC Zeca' },
];

const Artists: React.FC = () => {
  return (
    <Container>
      <Title>Top Artistas</Title>
      <List>
        {mockArtists.map((artist) => (
          <ArtistItem key={artist.id}>
            <Avatar>🎤</Avatar>
            <Name>{artist.name}</Name>
          </ArtistItem>
        ))}
      </List>
    </Container>
  );
};

export default Artists; 