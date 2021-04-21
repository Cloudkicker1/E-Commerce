import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';

const mainUrlPath = "http://localhost:4000/order"

@Injectable({
  providedIn: 'root'
})
export class Orderservice {

  constructor(private httpclient: HttpClient) { }

  dateValidator(shippingDate): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/datevalidator`, { shippingDate });
  }

  placeOrder(orderInfo: IOrder): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/placeorder`, orderInfo);
  }
}
