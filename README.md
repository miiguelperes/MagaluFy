# MagaluFy

Aplicação fullstack (React + Node.js) integrada com a API do Spotify, seguindo o desafio técnico Luiza Labs.

## Tecnologias
- Monorepo (npm workspaces)
- Frontend: React + Vite + TypeScript + Styled Components
- Backend: Node.js + Express + TypeScript
- ESLint, Prettier, Husky, Commitlint
- Testes: Jest, React Testing Library, Supertest
- PWA

## Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode o backend
cd apps/backend && npm run dev

# Rode o frontend
cd apps/frontend && npm run dev
```

## Funcionalidades
- Autenticação via Spotify
- Listar artistas mais ouvidos
- Listar álbuns dos artistas
- Listar playlists do usuário
- Criar nova playlist
- Exibir dados do usuário
- Paginação
- Funcionamento offline (PWA)

## Requisitos atendidos
- [x] Segmentação de commits
- [x] Lint
- [x] Autenticação via Spotify
- [x] Listar artistas
- [x] Listar álbuns de um artista
- [x] Utilizar paginação
- [x] Funcionamento offline
- [x] Testes unitários
- [x] Deploy da aplicação
- [ ] Testes E2E (bônus)
- [ ] CI/CD (bônus)
- [x] Responsividade
- [ ] SonarQube (bônus)
- [x] PWA

## Observações
- Interface baseada fielmente no protótipo fornecido.
- Documentação detalhada das decisões técnicas no final do projeto.
