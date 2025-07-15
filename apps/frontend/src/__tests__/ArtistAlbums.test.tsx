/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistAlbums from '../pages/ArtistAlbums';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const theme = { colors: { background: '#181818', primary: '#1db954', text: '#fff', sidebar: '#111', card: '#222' } };

// Mock axios para garantir que retorna items e total
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { items: [{ id: '1', name: 'Álbum 1', images: [{ url: '' }], release_date: '2022-01-01' }], total: 1 } })),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', display_name: 'Usuário', images: [{ url: '' }] }, loading: false }),
}));

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  update: jest.fn(),
  keys: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: { artistName: 'Artista Teste' } }),
    useParams: () => ({ artistId: '1' }),
  };
});

describe('ArtistAlbums', () => {
  beforeAll(() => {
    // Mock navigator.onLine como true
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    });

    // Mock IntersectionObserver
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.IntersectionObserver = class {
      constructor() {}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      observe() {}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      disconnect() {}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      unobserve() {}
    } as any;
  });

  it('deve renderizar o header', async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ArtistAlbums />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(await screen.findByText('Artista Teste')).toBeInTheDocument();
    expect(await screen.findByText('U')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/artists');
  });
}); 