/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const theme = { colors: { background: '#181818', primary: '#1db954', text: '#fff', sidebar: '#111', card: '#222' } };

describe('HeaderMobile', () => {
  it('deve renderizar a logo e o botão hamburger', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </ThemeProvider>
    );
    // Deve haver pelo menos um elemento com o texto Spotify (logo mobile)
    expect(screen.getAllByText('Spotify').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByLabelText(/abrir menu/i)).toBeInTheDocument();
  });
}); 