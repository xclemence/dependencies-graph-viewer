import { AssemblyPage } from '../pages/assembly.po';

describe('workspace-project App', () => {
  let page: AssemblyPage;

  beforeEach(() => {
    page = new AssemblyPage();
  });

  it('open assembly details', () => {
    page.navigateTo();

    page.getAssemblyRows().should('have.length', 5)

    page.openAssemblyDetails(0);

    page.getDetailsHeader().should('have.text', 'Depth View : Software 1 (2.0.0)');

    page.closeAssemblyDetails();
    page.openAssemblyDetails(2);

    page.getDetailsHeader().should('have.text', 'Depth View : dll1 name (1.0.0)');
  });
});
