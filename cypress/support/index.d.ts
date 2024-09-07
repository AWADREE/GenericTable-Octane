// support/index.d.ts
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to log in.
     * @example cy.goto()
     */
    goto(pathName: string): Chainable<void>;
  }
}
