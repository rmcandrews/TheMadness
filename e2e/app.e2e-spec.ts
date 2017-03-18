import { TheMadnessPage } from './app.po';

describe('the-madness App', () => {
  let page: TheMadnessPage;

  beforeEach(() => {
    page = new TheMadnessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
