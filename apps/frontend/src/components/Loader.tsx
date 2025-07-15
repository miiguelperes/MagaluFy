import React from 'react';
import styled, { useTheme } from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
`;

const Spinner = styled.div.attrs({ role: 'presentation' })`
  border: 8px solid #222;
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @media (max-width: 700px) {
    width: 48px;
    height: 48px;
    border-width: 6px;
  }
`;

const Loader: React.FC = () => (
  <LoaderWrapper>
    <Spinner />
  </LoaderWrapper>
);

export default Loader; 