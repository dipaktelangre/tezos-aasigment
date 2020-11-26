import { Action, createReducer, on, State } from '@ngrx/store';

import {
  loadTransactions,
  loadTransactionsSuccess,
} from '../actions/transaction.actions';

export const initialState: any = [];

const _transactionReducer = createReducer(
  initialState,
  on(loadTransactionsSuccess, (state, { payload }) => [...payload])
);

export function transactionReducer(
  state: State<any> | undefined,
  action: Action
) {
  return _transactionReducer(state, action);
}
