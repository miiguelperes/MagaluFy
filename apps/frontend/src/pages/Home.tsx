import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Text = styled.p`
  color: #ccc;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1ed760;
  }
`;

const Home: React.FC = () => {
  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };
  return (
    <Container>
      <Logo>Spotify</Logo>
      <Text>Entre com sua conta Spotify e aproveite o melhor da música.</Text>
      <Button onClick={handleLogin}>Entrar</Button>
    </Container>
  );
};

export default Home; 