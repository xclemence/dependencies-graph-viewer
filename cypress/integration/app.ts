import { AppPage } from '../pages/app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    page.getTitle().contains('DGV');
  });
});
