describe('Fluxo E2E - Todas as Telas', () => {
  beforeEach(() => {
    cy.intercept('GET', /\/api\/user\/me.*/, {
      statusCode: 200,
      body: {
        id: 'e2e-user',
        display_name: 'Usuário E2E',
        email: 'e2e@magalufy.com',
        images: [{ url: '' }],
      },
    });
    cy.intercept('GET', /\/api\/artists\/top.*/, {
      statusCode: 200,
      body: {
        items: [
          { id: '1', name: 'Artista E2E', images: [{ url: '' }] }
        ],
        total: 1
      },
    });
    cy.intercept('GET', /\/api\/playlists.*/, {
      statusCode: 200,
      body: {
        items: [
          { id: '1', name: 'Playlist E2E', images: [{ url: '' }], description: 'Playlist de teste' }
        ],
        total: 1
      },
    });
  });

  it('Deve exibir a Home autenticada', () => {
    cy.visit('/');
    cy.contains('Usuário E2E', { timeout: 10000 }).should('be.visible');
  });

  it('Deve navegar para Artistas', () => {
    cy.visit('/artists');
    cy.contains('Top Artistas', { timeout: 10000 }).should('be.visible');
  });

  it('Deve navegar para Playlists', () => {
    cy.visit('/playlists');
    cy.contains('Minhas Playlists', { timeout: 10000 }).should('be.visible');
  });

  it('Deve navegar para Perfil autenticado', () => {
    cy.visit('/profile');
    cy.contains('Usuário E2E', { timeout: 10000 }).should('be.visible');
  });
}); 