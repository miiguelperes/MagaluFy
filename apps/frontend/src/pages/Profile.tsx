import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #222;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #fff;
`;

const Name = styled.h2`
  color: #fff;
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
  // Aqui será feita a chamada para a API de perfil do usuário
  return (
    <Container>
      <Avatar>👤</Avatar>
      <Name>Fulano dos Santos</Name>
      <Button>Sair</Button>
    </Container>
  );
};

export default Profile; 