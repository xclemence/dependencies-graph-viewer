
export class SoftwarePage {

  navigateTo(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.visit('/software');
  }

  getSoftwares(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').find('mat-list-option');
  }

  getSelectedSoftwares(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').find('.mat-list-single-selected-option');
  }

  selectSoftware(index: number): void {
    cy.get('body').find('mat-list-option').eq(index).click();
  }

  openVisibilityPanel(): void {
    cy.get('#open-visibility-button').click();
  }

  closeVisibilityPanel(): void {
    cy.get('#close-visibility-button').click();
  }

  getAssemblyVisibility(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').find('.assemblies-panel .mat-list-item');
  }

  toggleAssemblyVisibility(index: number): void {
    cy.get('body').find('mat-list-item mat-checkbox').eq(index).click();
  }
}
