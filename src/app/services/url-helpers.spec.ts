import { getBaseUrl } from './url-helpers';
describe('UrlHelper', () => {
  it('Should return correct base url', () => {
    const baseUrl = getBaseUrl();
    expect(baseUrl).toContain('https://api.tzstats.com/');
  });
});
