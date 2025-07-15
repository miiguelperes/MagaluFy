// suporte global para Cypress
require('./commands');
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Failed to register a ServiceWorker')) {
    return false;
  }
});
