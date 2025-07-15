/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { ThemeProvider } from 'styled-components';

const theme = { colors: { background: '#181818', primary: '#1db954', text: '#fff', sidebar: '#111', card: '#222' } };

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: null, loading: false, login: jest.fn() }),
}));

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  update: jest.fn(),
  keys: jest.fn(),
}));

describe('Home', () => {
  it('deve renderizar mensagem de boas-vindas e botão de login', () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );
    expect(screen.getByText(/entrar/i)).toBeInTheDocument();
    expect(screen.getByText(/aproveite o melhor da música/i)).toBeInTheDocument();
  });
}); 