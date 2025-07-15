import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    background: '#181818',
    primary: '#1db954',
    text: '#fff',
    sidebar: '#111',
    card: '#222',
  },
};

describe('Sidebar', () => {
  it('deve renderizar os links principais', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Artistas').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Playlists').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Perfil').length).toBeGreaterThanOrEqual(1);
  });

  it('deve abrir o menu mobile ao clicar no hamburger', () => {
    // Força o mobile
    window.innerWidth = 400;
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </ThemeProvider>
    );
    const hamburger = screen.getByLabelText(/abrir menu/i);
    fireEvent.click(hamburger);
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Instalar PWA').length).toBeGreaterThanOrEqual(1);
  });
}); 