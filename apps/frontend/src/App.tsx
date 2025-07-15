import React from 'react';
import { Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import ArtistAlbums from './pages/ArtistAlbums';
import { useAuth } from './contexts/AuthContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  padding: 48px 48px 32px 48px;
  min-height: 100vh;
  margin-left: 320px;
  @media (max-width: 700px) {
    margin-left: 0;
    padding: 24px 8px 16px 8px;
  }
`;

const UserAvatarWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 48px;
  z-index: 200;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid #222;
  background: #222;
`;

const UserAvatarFallback = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
  border: 2.5px solid #222;
`;

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Sidebar />
        <Main style={{ position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists/*" element={<Artists />} />
            <Route path="/playlists/*" element={<Playlists />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artists/:artistId/albums" element={<ArtistAlbums />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Main>
      </Layout>
    </>
  );
}

export default App;
