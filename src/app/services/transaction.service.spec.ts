import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TransactionsService } from './transaction.service';

let httpClientSpy: { get: jasmine.Spy };
let transactionService: TransactionsService;

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  transactionService = new TransactionsService(
    httpClientSpy as any,
    'base_url'
  );
});

describe('TransactionService', () => {
  it('should return expected transactions (HttpClient called once)', () => {
    const expectedTransaction = [
      [
        18991940,
        1576404169000,
        'transaction',
        'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
        15139.244751,
      ],
    ];

    httpClientSpy.get.and.returnValue(of(expectedTransaction));

    transactionService
      .getTransactions({})
      .subscribe(
        (trans) =>
          expect(trans).toEqual(expectedTransaction, 'expected transactions'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 500', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Server Error',
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    transactionService.getTransactions({}).subscribe(
      (heroes) => fail('expected an error, not transaction'),
      (error) => expect(error.message).toContain('500 Server Error')
    );
  });
});
