import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddedProduct } from 'src/app/Models/userModels/addedProduct.model';
import { IProductToDelete } from 'src/app/Models/storeModels/product.models';

const mainUrlPath = "http://localhost:4000/cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient: HttpClient) { }

  addToCart(productToAdd: AddedProduct): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/addproducttocart`, productToAdd);
  };

  getCart(): Observable<any> {
    return this.httpclient.get(`${mainUrlPath}/getcart`);
  };

  deleteFromCart(productToDelete: IProductToDelete): Observable<any> {
    return this.httpclient.put(`${mainUrlPath}/deletefromcart`, productToDelete);
  };

  deleteEmptyCart(): Observable<any> {
    return this.httpclient.delete(`${mainUrlPath}/deleteemptycart`);
  };
};
