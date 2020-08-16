import { browser } from 'protractor';

import { AssemblyPage } from '../pages/assembly.po';

describe('workspace-project App', () => {
  let page: AssemblyPage;

  beforeEach(() => {
    page = new AssemblyPage();
  });

  it('open assembly details', async () => {
    await page.navigateTo();

    expect(await page.getAssemblyCount()).toEqual(5);

    browser.waitForAngularEnabled(false);
    await page.openAssemblyDetails(0);

    expect(await page.getDetailsHeader()).toEqual('Depth View : Software 1 (2.0.0.0)');

    await page.closeAssemblyDetails();
    await page.openAssemblyDetails(2);

    expect(await page.getDetailsHeader()).toEqual('Depth View : dll1 name (1.0.0.0)');

  });
});
