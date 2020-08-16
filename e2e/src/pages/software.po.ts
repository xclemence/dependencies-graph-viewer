import { $, $$, browser, protractor } from 'protractor';

export class SoftwarePage {
  navigateTo() {
    return browser.get('/software');
  }

  selectSofware(index: number) {
    return $$('mat-list-option').get(index).click();
  }

  getGraphAssemblyCount() {
    return $$('g.nodes>g').count();
  }

  openVisibilityPanel() {
    return $('#open-visibility-button').click();
  }

  closeVisibilityPanel() {
    return $('#close-visibility-button').click();
  }

  waitAssemblyLoaded() {
    return browser.wait(protractor.ExpectedConditions.presenceOf($('.nodes')), 1000);
  }

  waitAssemblyNamesLoaded() {
    return browser.wait(protractor.ExpectedConditions.presenceOf($('mat-list-option')), 1000);
  }
  getAssemblyVisibilityCount() {
    return $$('.assemblies-panel .mat-list-item').count();
  }

  toggleAssemblyVisibility(index: number) {
    return $$('mat-list-item mat-checkbox').get(index).click();
  }
}
