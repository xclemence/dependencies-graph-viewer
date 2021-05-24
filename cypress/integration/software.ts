import { SoftwarePage } from '../pages/software.po';

describe('workspace-project App', () => {
  let page: SoftwarePage;

  beforeEach(() => {
    page = new SoftwarePage();
    page.navigateTo();
  });

  it('view software details', () => {

    page.getSoftwares().should('have.length', 2);

    page.selectSoftware(0);

    page.selectSoftware(1);

    page.getSelectedSoftwares().should('have.length', 1);

  });

  it('filter assemblies', () => {

    page.selectSoftware(0);

    page.openVisibilityPanel();

    page.getAssemblyVisibility().should('have.length', 3);

    page.toggleAssemblyVisibility(1);

    page.closeVisibilityPanel();
  });
});
