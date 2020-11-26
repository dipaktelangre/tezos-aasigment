import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import {
  loadNextTransactions,
  loadTransactions,
} from '../store/actions/transaction.actions';

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
    status: 'Status',
    fee: 'fee',
  };
  visibleColumns = new Set<string>(Object.keys(this.columns));

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  lastRowId: number;

  constructor(
    private store: Store<{ transactions: any }>,
    private ngZone: NgZone
  ) {
    this.transactions$ = store.select('transactions');
    this.transactions$.subscribe((trans) => {
      console.log(trans);
      if (trans && trans.length > 0) {
        this.transactions = trans;
        this.lastRowId = trans[0][0];
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

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          console.log('load more');
          let params = {
            columns: [...this.visibleColumns].join(','),
            receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
            type: 'transaction',
            'cursor.lte': this.lastRowId,
            limit: '10',
          };
          this.store.dispatch(loadNextTransactions({ payload: { ...params } }));
        });
      });
  }

  columnIsVisible = (column: string): boolean =>
    this.visibleColumns.has(column);
}
