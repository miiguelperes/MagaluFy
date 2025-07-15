# MagaluFy

[Repositório no GitHub](https://github.com/miiguelperes/MagaluFy)

Aplicação fullstack (React + Node.js) integrada com a API do Spotify, seguindo o desafio técnico Luiza Labs.

## Tecnologias
- Monorepo (npm workspaces)
- Frontend: React + Vite + TypeScript + Styled Components
- Backend: Node.js + Express + TypeScript
- ESLint, Prettier, Husky, Commitlint
- Testes: Jest, React Testing Library, Supertest, Cypress
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

## Testes unitários e integração

```bash
# Na raiz do projeto (roda todos os testes)
npm test

# Ou individualmente
cd apps/frontend && npm test
cd apps/backend && npm test
```

## Testes E2E (Cypress)

- O frontend possui um mock de autenticação e dados ativado por `VITE_E2E=1`.
- O Cypress intercepta as principais rotas de API, tornando os testes rápidos e independentes do backend real.

```bash
# Rode o backend
cd apps/backend && npm run dev

# Rode o frontend em modo E2E (mock de login)
cd apps/frontend && npm run dev:e2e

# Em outro terminal, rode o Cypress
npx cypress open # ou npx cypress run
```

## CI/CD (GitHub Actions)

- O projeto executa testes unitários, integração e E2E automaticamente a cada push/PR.
- Veja o status na aba "Actions" do GitHub.

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
- [x] Testes E2E (bônus)
- [x] CI/CD (bônus)
- [x] Responsividade
- [ ] SonarQube (bônus)
- [x] PWA

## Observações
- Interface baseada fielmente no protótipo fornecido.
- Documentação detalhada das decisões técnicas no final do projeto.

## Troubleshooting
- Se o Cypress não encontrar o usuário "Usuário E2E", verifique se rodou o frontend com `npm run dev:e2e`.
- Se algum teste E2E falhar, confira se as portas 5173 (frontend) e 4000 (backend) estão livres.
