import { $, browser, promise } from 'protractor';

export class AppPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  getTitleText(): promise.Promise<string> {
    return $('app-root h3').getText();
  }
}
