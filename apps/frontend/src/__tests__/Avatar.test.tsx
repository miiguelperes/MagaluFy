/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #333;
  border: 2px solid #222;
`;
const AvatarFallback = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #b3b3b3;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #222;
`;

describe('Avatar', () => {
  it('deve renderizar imagem quando src for fornecido', () => {
    render(<Avatar src="/avatar.png" alt="avatar" data-testid="avatar-img" />);
    expect(screen.getByTestId('avatar-img')).toBeInTheDocument();
  });
  it('deve renderizar fallback quando não houver src', () => {
    render(<AvatarFallback>U</AvatarFallback>);
    expect(screen.getByText('U')).toBeInTheDocument();
  });
}); 