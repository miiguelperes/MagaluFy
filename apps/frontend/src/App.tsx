import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import ArtistAlbums from './pages/ArtistAlbums';

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

function App() {
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
