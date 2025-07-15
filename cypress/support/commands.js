Cypress.Commands.add('loginSpotify', (email, password) => {
  cy.visit('/');
  cy.contains('Entrar').click();
  cy.origin(
    'https://accounts.spotify.com',
    { args: { email, password } },
    ({ email, password }) => {
      cy.get('input#login-username').type(email);
      cy.get('input#login-password').type(password);
      cy.get('button[type=submit]').click();
    }
  );
  // Aguarda redirecionamento e token
  cy.url().should('not.include', 'accounts.spotify.com');
}); 