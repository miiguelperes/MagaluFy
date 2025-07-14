import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 220px;
  background: ${({ theme }) => theme.colors.sidebar};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0 0 0;
  min-height: 100vh;
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 40px 32px;
  letter-spacing: -2px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 12px 32px;
  font-size: 1.1rem;
  border-left: 4px solid transparent;
  transition: background 0.2s, border-color 0.2s;
  &.active {
    background: #181818;
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    background: #222;
  }
`;

const InstallPWA = styled.div`
  margin-top: auto;
  padding: 24px 32px;
  color: #888;
  font-size: 0.95rem;
`;

const Sidebar: React.FC = () => (
  <SidebarContainer>
    <Logo>Spotify</Logo>
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/artists">Artistas</StyledLink>
      <StyledLink to="/playlists">Playlists</StyledLink>
      <StyledLink to="/profile">Perfil</StyledLink>
    </Nav>
    <InstallPWA>Instalar PWA</InstallPWA>
  </SidebarContainer>
);

export default Sidebar; 