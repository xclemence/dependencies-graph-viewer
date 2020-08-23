import { SoftwarePage } from '../pages/software.po';

describe('workspace-project App', () => {
  let page: SoftwarePage;

  beforeEach(() => {
    page = new SoftwarePage();
  });

  it('view software details', async () => {
    await page.navigateTo();

    await page.selectSoftware(0);

    await page.selectSoftware(1);
  });

  it('filter assemblies', async () => {
    await page.navigateTo();

    await page.selectSoftware(0);

    await page.openVisibilityPanel();

    expect(await page.getAssemblyVisibilityCount()).toEqual(3);

    await page.toggleAssemblyVisibility(1);

    await page.closeVisibilityPanel();
  });
});
