import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tezos|transactions';
  arrNumber: number[] = [];
  constructor() {
    for (let i = 0; i < 10000; i++) {
      this.arrNumber.push(i);
    }
  }
}
