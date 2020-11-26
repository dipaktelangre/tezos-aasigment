import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTransactions } from '../store/actions/transaction.actions';

import { AppState } from '../store/models/app-state';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<any>;
  transactions = [];
  columns = {
    row_id: 'No',
    type: 'Type',
    time: 'Time',
    sender: 'sender',
  };
  visibleColumns = new Set<string>(Object.keys(this.columns));

  constructor(private store: Store<{ transactions: any }>) {
    this.transactions$ = store.select('transactions');
    this.transactions$.subscribe((trans) => {
      console.log(trans);
      if (trans && trans.length > 0) {
        this.transactions = trans;
        // tran.map((t) => {
        //   const [row_id, time, type, sender, volume] = t;
        //   return { row_id, time, type, sender, volume };
        // });
      }
    });
  }

  ngOnInit() {
    let params = {
      columns: [...this.visibleColumns].join(','),
      receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
      type: 'transaction',
      limit: '10',
    };
    this.store.dispatch(loadTransactions({ payload: { ...params } }));
  }

  columnIsVisible = (column: string): boolean =>
    this.visibleColumns.has(column);
}
