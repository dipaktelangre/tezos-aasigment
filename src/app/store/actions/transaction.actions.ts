import { createAction, props } from '@ngrx/store';

export const loadTransactions = createAction('[Transactions] Load');

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Success',
  props<{ payload: any }>()
);

export const loadTransactionsError = createAction('[Transactions] Load Error');
