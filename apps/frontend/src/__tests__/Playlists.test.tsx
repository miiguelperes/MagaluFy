/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Playlists from '../pages/Playlists';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const theme = { colors: { background: '#181818', primary: '#1db954', text: '#fff', sidebar: '#111', card: '#222' } };

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { items: [{ id: '1', name: 'Playlist 1', images: [], description: '', owner: { display_name: 'User' }, tracks: { total: 10 }, public: true }], total: 1 } })),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', display_name: 'Usuário', images: [{ url: '' }] }, loading: false }),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: {} }),
    useParams: () => ({}),
  };
});

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  update: jest.fn(),
  keys: jest.fn(),
}));

// Mock IntersectionObserver
beforeAll(() => {
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

describe('Playlists', () => {
  it('deve renderizar título', async () => {
    await waitFor(() => {
      render(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Playlists />
          </BrowserRouter>
        </ThemeProvider>
      );
      expect(screen.getByText(/minhas playlists/i)).toBeInTheDocument();
    });
  }, 10000);
}); 