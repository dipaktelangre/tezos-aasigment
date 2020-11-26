import { createAction, props } from '@ngrx/store';

export const loadTransactions = createAction(
  '[Transactions] Load',
  props<{ payload: any }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Success',
  props<{ payload: any }>()
);

export const loadNextTransactions = createAction(
  '[Transactions] Load Next',
  props<{ payload: any }>()
);

export const loadNextTransactionsSuccess = createAction(
  '[Transactions] Load Next Success',
  props<{ payload: any }>()
);

export const loadTransactionsError = createAction('[Transactions] Load Error');
