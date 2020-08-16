import { $, $$, browser, protractor } from 'protractor';

export class AssemblyPage {
  navigateTo() {
    return browser.get('/assembly');
  }

  getAssemblyCount() {
    return $$('.cdk-row').count();
  }

  openAssemblyDetails(index: number) {
    return $$('.cdk-row').get(index).click();
  }

  getDetailsHeader() {
    return $('.assembly-details-header').getText();
  }

  closeAssemblyDetails() {
    return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
  }
}
