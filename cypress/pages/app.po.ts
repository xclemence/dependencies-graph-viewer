
export class AppPage {
  navigateTo(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.visit('/');
  }

  getTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('app-root h3');
  }
}
