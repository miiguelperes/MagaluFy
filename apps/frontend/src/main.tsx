import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { register as registerServiceWorker } from './registerServiceWorker';

const theme = {
  colors: {
    background: '#181818',
    primary: '#1db954',
    text: '#fff',
    sidebar: '#121212', // contraste sutil com o background
    card: '#222',
  },
};

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
