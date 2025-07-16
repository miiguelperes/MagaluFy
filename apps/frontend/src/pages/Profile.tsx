import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';

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

const AvatarFallback = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 24px;
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
  React.useEffect(() => {
    document.title = "MagaluFy | Perfil";
  }, []);
  const { user, loading, logout } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Container>Faça login para ver seu perfil.</Container>;

  return (
    <Container>
      {user.images?.[0]?.url ? (
        <Avatar src={user.images[0].url} alt={user.display_name} />
      ) : (
        <AvatarFallback>
          {user.display_name?.[0] || '?'}
        </AvatarFallback>
      )}
      <Name>{user.display_name}</Name>
      <Button onClick={logout}>Sair</Button>
    </Container>
  );
};

export default Profile; 