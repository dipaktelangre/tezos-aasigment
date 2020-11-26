import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TransactionsService } from '../../services/transaction.service';
import {
  loadNextTransactions,
  loadNextTransactionsSuccess,
  loadTransactions,
  loadTransactionsError,
  loadTransactionsSuccess,
} from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTransactions),
      mergeMap((action) =>
        this.transactionService.getTransactions(action.payload).pipe(
          map((transactions) =>
            loadTransactionsSuccess({ payload: transactions })
          ),
          catchError(() => of(loadTransactionsError()))
        )
      )
    )
  );

  loadNextTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNextTransactions),
      mergeMap((action) =>
        this.transactionService.getTransactions(action.payload).pipe(
          map((transactions) =>
            loadNextTransactionsSuccess({ payload: transactions })
          ),
          catchError(() => of(loadTransactionsError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionsService
  ) {}
}
