import { $, $$, browser, promise, protractor } from 'protractor';

export class AssemblyPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/assembly');
  }

  getAssemblyCount(): promise.Promise<number> {
    return $$('.cdk-row').count();
  }

  openAssemblyDetails(index: number): promise.Promise<void> {
    return $$('.cdk-row').get(index).click();
  }

  getDetailsHeader(): promise.Promise<string> {
    return $('.assembly-details-header').getText();
  }

  closeAssemblyDetails(): promise.Promise<void> {
    return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
  }
}
