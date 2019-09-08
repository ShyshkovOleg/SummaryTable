import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  name = 'Req Service';
  url = '/v1/depth?symbol=ETHBTC&limit=1000';

  constructor(private http: HttpClient) {
    //
  }

  getData() {
    return this.http.get(this.url);
  }
}
