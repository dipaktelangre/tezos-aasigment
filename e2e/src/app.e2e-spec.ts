import { TransactionPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: TransactionPage;

  beforeEach(() => {
    page = new TransactionPage();
  });

  it('should display page title as  "Tezos|Transactions"', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Tezos|Transactions');
  });

  it('should display heading as  "Transactions"', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Transactions');
  });

  it('should display transactions table row data', () => {
    page.navigateTo();
    expect(page.getTransactionsTableFirstRow()).toEqual([
      '14849585',
      'transaction',
      'Sep 6, 2019, 3:45:04 AM',
      'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
      'applied',
      '0.0035',
    ]);
  });

  it('should display 10 transaction count', () => {
    page.navigateTo();
    expect(page.getTransactionCount()).toContain(10);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
