import { $, $$, browser, promise } from 'protractor';

export class SoftwarePage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/software');
  }

  selectSoftware(index: number): promise.Promise<void> {
    return $$('mat-list-option').get(index).click();
  }

  openVisibilityPanel(): promise.Promise<void> {
    return $('#open-visibility-button').click();
  }

  closeVisibilityPanel(): promise.Promise<void> {
    return $('#close-visibility-button').click();
  }

  getAssemblyVisibilityCount(): promise.Promise<number> {
    return $$('.assemblies-panel .mat-list-item').count();
  }

  toggleAssemblyVisibility(index: number): promise.Promise<void> {
    return $$('mat-list-item mat-checkbox').get(index).click();
  }
}
