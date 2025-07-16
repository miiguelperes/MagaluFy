import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

interface User {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Função utilitária para acessar import.meta.env.VITE_E2E, permitindo sobrescrever via window.__E2E__ em testes
export async function getIsE2E() {
  // Em ambiente de teste (Jest), nunca acessar import.meta.env nem importar envUtils
  if (typeof process !== 'undefined' && process.env && process.env.JEST_WORKER_ID !== undefined) {
    if (typeof window !== 'undefined' && typeof (window as any).__E2E__ !== 'undefined') return (window as any).__E2E__;
    return false;
  }
  if (typeof window !== 'undefined' && typeof (window as any).__E2E__ !== 'undefined') return (window as any).__E2E__;
  // No browser, importa envUtils dinamicamente
  if (typeof window !== 'undefined') {
    const mod = await import('../utils/envUtils');
    return mod.isE2E;
  }
  return false;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock E2E: se variável de ambiente estiver ativa, sobrescreve user e loading
  const isE2E = getIsE2E();
  const mockUser: User = {
    id: 'e2e-user',
    display_name: 'Usuário E2E',
    email: 'e2e@magalufy.com',
    images: [{ url: '' }],
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/me');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isE2E) fetchUser();
    else {
      setUser(mockUser);
      setLoading(false);
    }
  }, []);

  const login = () => {
    if (!isE2E) window.location.href = 'http://127.0.0.1:4000/api/auth/login';
  };

  const logout = () => {
    if (!isE2E) {
      window.location.href = 'http://127.0.0.1:4000/api/auth/logout';
      setUser(null);
    }
  };

  const contextValue = useMemo(() => ({
    user: isE2E ? mockUser : user,
    loading: isE2E ? false : loading,
    login,
    logout,
  }), [isE2E, user, loading, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 