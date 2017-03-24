import { WhatIDoAppPage } from './app.po';

describe('what-i-do-app App', () => {
  let page: WhatIDoAppPage;

  beforeEach(() => {
    page = new WhatIDoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
