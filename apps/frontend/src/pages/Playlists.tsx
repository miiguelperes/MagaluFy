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

const Playlists: React.FC = () => {
  // Aqui será feita a chamada para a API de playlists do usuário
  return (
    <Container>
      <Title>Minhas Playlists</Title>
      <Button>Criar playlist</Button>
      {/* Lista de playlists */}
    </Container>
  );
};

export default Playlists; 