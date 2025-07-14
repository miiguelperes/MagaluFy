import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #222;
  margin-bottom: 24px;
  object-fit: cover;
`;

const Name = styled.h2`
  color: #fff;
  margin-bottom: 12px;
`;

const Email = styled.p`
  color: #ccc;
  margin-bottom: 12px;
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
  margin-top: 24px;
  &:hover {
    background: #1ed760;
  }
`;

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <Container>Carregando...</Container>;
  if (!user) return <Container>Faça login para ver seu perfil.</Container>;

  return (
    <Container>
      <Avatar src={user.images[0]?.url || ''} alt={user.display_name} />
      <Name>{user.display_name}</Name>
      <Email>{user.email}</Email>
      <Button onClick={logout}>Sair</Button>
    </Container>
  );
};

export default Profile; 