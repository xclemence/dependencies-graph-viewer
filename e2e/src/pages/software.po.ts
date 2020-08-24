import { $, $$, browser } from 'protractor';

export class SoftwarePage {
  navigateTo() {
    return browser.get('/software');
  }

  selectSoftware(index: number) {
    return $$('mat-list-option').get(index).click();
  }

  openVisibilityPanel() {
    return $('#open-visibility-button').click();
  }

  closeVisibilityPanel() {
    return $('#close-visibility-button').click();
  }

  getAssemblyVisibilityCount() {
    return $$('.assemblies-panel .mat-list-item').count();
  }

  toggleAssemblyVisibility(index: number) {
    return $$('mat-list-item mat-checkbox').get(index).click();
  }
}
