/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const TestComponent = () => {
  const { user, loading } = useAuth();
  let content;
  if (loading) {
    content = 'Carregando...';
  } else {
    content = user ? user.display_name : 'Deslogado';
  }
  return <div>{content}</div>;
};

describe('AuthContext', () => {
  it('deve exibir Carregando... quando loading for true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
}); 