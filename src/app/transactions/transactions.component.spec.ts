import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionsComponent } from './transactions.component';

import { TestStore } from '../store/test.store';
import { Store } from '@ngrx/store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('TransactionsComponent', () => {
  let store: TestStore<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ScrollingModule, MatProgressSpinnerModule],
      declarations: [TransactionsComponent],
      providers: [
        { provide: Store, useClass: TestStore }, // use test store instead of ngrx store
      ],
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<any>) => {
    store = testStore; // save store reference for use in tests
    store.setState([]); // set default state
  }));

  it('should create the transaction component', () => {
    const fixture = TestBed.createComponent(TransactionsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title Transaction', () => {
    const fixture = TestBed.createComponent(TransactionsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain(
      'Transactions'
    );
  });

  it('should display Transactions', () => {
    const fixture = TestBed.createComponent(TransactionsComponent);
    store.setState([
      [
        18991940,
        1576404169000,
        'transaction',
        'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
        15139.244751,
      ],
    ]);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);
  });
});
