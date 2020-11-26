import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TransactionsService } from '../../services/transaction.service';
import {
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

  constructor(
    private actions$: Actions,
    private transactionService: TransactionsService
  ) {}
}
