import { $, browser } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return $('app-root h3').getText();
  }
}
