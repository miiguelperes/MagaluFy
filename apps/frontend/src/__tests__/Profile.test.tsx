/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import { ThemeProvider } from 'styled-components';

const theme = { colors: { background: '#181818', primary: '#1db954', text: '#fff', sidebar: '#111', card: '#222' } };

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { display_name: 'Usuário', images: [] }, loading: false, logout: jest.fn() }),
}));

describe('Profile', () => {
  it('deve renderizar nome do usuário', () => {
    render(
      <ThemeProvider theme={theme}>
        <Profile />
      </ThemeProvider>
    );
    expect(screen.getByText('Usuário')).toBeInTheDocument();
  });
}); 