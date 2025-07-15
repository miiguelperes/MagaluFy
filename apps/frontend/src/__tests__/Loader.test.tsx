import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader';
import { ThemeProvider } from 'styled-components';

describe('Loader', () => {
  it('deve renderizar o spinner', () => {
    const theme = {
      colors: {
        background: '#181818',
        primary: '#1db954',
        text: '#fff',
        sidebar: '#111',
        card: '#222',
      },
    };
    render(
      <ThemeProvider theme={theme}>
        <Loader />
      </ThemeProvider>
    );
    const spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });
}); 