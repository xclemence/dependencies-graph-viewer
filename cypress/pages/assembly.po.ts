
export class AssemblyPage {
  navigateTo(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.visit('/assembly');
  }

  getAssemblyRows(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.cdk-table').find('.cdk-row');
  }

  openAssemblyDetails(index: number): void {
    cy.get('.cdk-table').find('.cdk-row').eq(index).click();
  }

  getDetailsHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.assembly-details-header');
  }

  closeAssemblyDetails(): void {
    cy.get('body').type('{esc}')
  }
}
