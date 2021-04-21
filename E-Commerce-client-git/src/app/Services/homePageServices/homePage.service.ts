import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const mainUrlStorePath = "http://localhost:4000/store"
const mainUrlUserPath = "http://localhost:4000/users"

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private httpclient: HttpClient) { }

  getInfoSummery(): Observable<any> {
    return this.httpclient.get(`${mainUrlStorePath}/homepage`,
    )
  };

  lastOrder(): Observable<any> {
    return this.httpclient.get(`${mainUrlUserPath}/lastorder`);
  };

  activeCart(): Observable<any> {
    return this.httpclient.get(`${mainUrlUserPath}/activecart`);
  };
};
