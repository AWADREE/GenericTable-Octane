/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
// ***

Cypress.Commands.add("goto", (pathName: string) => {
  cy.visit("http://localhost:3000" + pathName).wait(1000);
});
