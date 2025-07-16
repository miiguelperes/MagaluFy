import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth, getIsE2E } from './AuthContext';

const TestComponent = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'loaded'}</span>
      <span data-testid="user">{user ? user.display_name : 'no-user'}</span>
    </div>
  );
};

describe('AuthContext', () => {
  beforeAll(() => {
    jest.spyOn(require('./AuthContext'), 'getIsE2E').mockReturnValue(false);
  });
  it('should render loading initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('loading').textContent).toBe('loading');
  });
}); 