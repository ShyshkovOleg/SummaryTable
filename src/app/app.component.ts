import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RequestService } from './request.service';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [RequestService]
})
export class AppComponent implements OnInit {
  title: string;
  bids;
  asks;
  mergedArr;
  volumeTotal = 0;
  sumTotal = 0;
  loaded = false;

  @ViewChild('table1000') table1000: ElementRef;

  constructor(private req: RequestService) {
    //
  }

  ngOnInit() {
    this.title = this.req.name;
    this.req.getData().subscribe((res: any) => {
      this.bids = res.bids;
      this.asks = res.asks;
      this.mergeArrays();
    });
  }

  mergeArrays() {
    this.mergedArr = this.asks.map((el, i) => {
      const obj: any = {};
      obj.asks = el;
      obj.bids = this.bids[i];
      return obj;
    });
    this.calculateTotal();
    this.sumAll();
    this.loaded = true;
    this.table1000.nativeElement.className = 'show';
    this.savetoLocal(this.mergedArr, this.volumeTotal, this.sumTotal, 'data');
  }

  calculateTotal() {
    this.volumeTotal = this.mergedArr
    .map((item) => Number(item.asks[1]) + Number(item.bids[1]))
    .reduce((previous, current) => previous + current, 0);
  }

  sumAll() {
    this.sumTotal = this.mergedArr
    .map((item) => (Number(item.asks[0]) * Number(item.asks[1])) + (Number(item.bids[0]) * Number(item.bids[1])))
    .reduce((previous, current) => previous + current, 0);
  }

  savetoLocal(arr, total1, total2, key) {
    const data = {
      mergeArrays: arr,
      volumeTotal: total1,
      sumTotal: total2
    };
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error writing tolacal: ${e}`);
    }
    console.log(`From local: ${JSON.parse(localStorage.getItem('data')).sumTotal}`);

  }

}
