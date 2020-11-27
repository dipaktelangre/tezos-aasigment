import { browser, by, element } from 'protractor';

export class TransactionPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getHeadingText(): Promise<string> {
    return element(by.css('app-root .title h3')).getText() as Promise<string>;
  }

  getTitleText(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }

  getTransactionsTableFirstRow(): Promise<Array<string>> {
    const row = element.all(by.css('table tr.data-row')).first();
    const cells = row.all(by.tagName('td'));
    const cellTexts = cells.map(function (elm) {
      return elm.getText();
    });
    return cellTexts as Promise<Array<string>>;
  }

  getTransactionCount(): Promise<string> {
    return element(
      by.css('.transactions-table .transaction-count')
    ).getText() as Promise<string>;
  }
}
