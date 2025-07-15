import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.sidebar};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0 0 0;
  z-index: 100;
  transition: transform 0.3s;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  width: 48px;
  height: 48px;
  display: none;
  margin-right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  @media (max-width: 700px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 32px;
  height: 6px;
  background: yellow !important;
  margin: 5px 0;
  border-radius: 3px;
  display: block !important;
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 40px 32px;
  letter-spacing: -2px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 12px 32px;
  font-size: 1.1rem;
  border-left: 4px solid transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  &.active {
    color: #fff;
    background: none;
    border-left: 4px solid transparent;
    font-weight: 700;
  }
  &:hover {
    background: #222;
  }
`;

const InstallPWA = styled.div`
  margin-top: auto;
  padding: 24px 32px;
  color: #888;
  font-size: 0.95rem;
`;

const SidebarOverlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 700px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 700px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: fixed;
    top: 56px;
    left: 0;
    width: 90vw;
    background: ${({ theme }) => theme.colors.sidebar};
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    z-index: 200;
    padding: 16px 0 8px 0;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 56px;
    background: ${({ theme }) => theme.colors.sidebar};
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 1100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  }
`;

const MobileLogo = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -2px;
`;

// Adicionar o componente SVG do hamburger
const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 310 259.344"
    {...props}
  >
    <title>Hamburger (Menu) Icon</title>
    <path
      d="M19.668 1032.694h250.646M19.668 932.694h250.646M19.668 832.694h250.646"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 49.33635712,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        strokeOpacity: 1,
        strokeDasharray: "none",
      }}
      transform="translate(10.016 -803.031)"
    />
  </svg>
);

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // Fecha menu mobile ao clicar fora
  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#mobile-menu') && !(e.target as HTMLElement).closest('#mobile-hamburger')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <>
      <MobileHeader>
        <MobileLogo>Spotify</MobileLogo>
        <Hamburger id="mobile-hamburger" onClick={() => setOpen(o => !o)} aria-label="Abrir menu">
          <HamburgerIcon />
        </Hamburger>
      </MobileHeader>
     
      <SidebarContainer>
        <Logo>Spotify</Logo>
        <Nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/artists">Artistas</StyledLink>
          <StyledLink to="/playlists">Playlists</StyledLink>
          <StyledLink to="/profile">Perfil</StyledLink>
        </Nav>
        <InstallPWA>Instalar PWA</InstallPWA>
      </SidebarContainer>
      <MobileMenu $open={open} id="mobile-menu">
        <StyledLink to="/" onClick={() => setOpen(false)}>Home</StyledLink>
        <StyledLink to="/artists" onClick={() => setOpen(false)}>Artistas</StyledLink>
        <StyledLink to="/playlists" onClick={() => setOpen(false)}>Playlists</StyledLink>
        <StyledLink to="/profile" onClick={() => setOpen(false)}>Perfil</StyledLink>
        <InstallPWA>Instalar PWA</InstallPWA>
      </MobileMenu>
    </>
  );
};

export default Sidebar; 