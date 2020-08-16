import { browser } from 'protractor';

import { SoftwarePage } from '../pages/software.po';

describe('workspace-project App', () => {
  let page: SoftwarePage;

  beforeEach(() => {
    page = new SoftwarePage();
  });

  it('view software details', async () => {
    await page.navigateTo();

    browser.waitForAngularEnabled(false);

    await page.waitAssemblyNamesLoaded();

    await page.selectSoftware(0);
    await page.waitAssemblyLoaded();

    expect(await page.getGraphAssemblyCount()).toEqual(4);

    await page.selectSoftware(1);
    await page.waitAssemblyLoaded();

    expect(await page.getGraphAssemblyCount()).toEqual(1);
  });

  it('filter assemblies', async () => {
    await page.navigateTo();

    browser.waitForAngularEnabled(false);

    await page.waitAssemblyNamesLoaded();

    await page.selectSoftware(0);
    await page.waitAssemblyLoaded();

    await page.openVisibilityPanel();

    expect(await page.getAssemblyVisibilityCount()).toEqual(3);

    await page.toggleAssemblyVisibility(1);
    await page.waitAssemblyLoaded();

    await page.closeVisibilityPanel();

    expect(await page.getGraphAssemblyCount()).toEqual(3);
  });
});
