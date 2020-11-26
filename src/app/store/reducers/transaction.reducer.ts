import { state } from '@angular/animations';
import { Action, createReducer, on, State } from '@ngrx/store';

import {
  loadNextTransactionsSuccess,
  loadTransactions,
  loadTransactionsSuccess,
} from '../actions/transaction.actions';

export const initialState: any = [];

const _transactionReducer = createReducer(
  initialState,
  on(loadTransactionsSuccess, (state, { payload }) => [...payload]),
  on(loadNextTransactionsSuccess, (state, { payload }) => [
    ...payload,
    ...state,
  ])
);

export function transactionReducer(
  state: State<any> | undefined,
  action: Action
) {
  return _transactionReducer(state, action);
}
