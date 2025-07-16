# MagaluFy

UI inspirada no Spotify, desenvolvida em React + Vite + TypeScript.

## Autor
- **Miguel Peres**

## Descrição
Aplicação frontend que consome a API do Spotify, com autenticação, playlists, artistas, álbuns e suporte a PWA.

## Tecnologias
- React
- Vite
- TypeScript
- Styled-components
- React Router
- PWA (manifest, service worker)
- Testes com Jest e Testing Library

## Instalação
```bash
npm install
```

## Rodando em desenvolvimento
```bash
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

## Build para produção
```bash
npm run build
```

## Testes
```bash
npm test
```

## PWA
- O app pode ser instalado como PWA em navegadores compatíveis.
- O botão "Instalar PWA" aparece no menu lateral.
- Caso não esteja elegível, o motivo será exibido ao clicar.

## Estrutura
- `src/pages` — Páginas principais (Home, Artistas, Playlists, Perfil, Álbuns)
- `src/components` — Componentes reutilizáveis
- `src/assets` — Ícones e logo
- `public/manifest.json` — Manifesto PWA

---

Desenvolvido por Miguel Peres.
