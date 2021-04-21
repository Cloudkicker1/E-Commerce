import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/Models/storeModels/category.model';
import { IProduct } from 'src/app/Models/storeModels/product.models';
import { ISearch } from 'src/app/Models/storeModels/search.model';

const mainStoreUrlPath = "http://localhost:4000/store"
const mainProductUrlPath = "http://localhost:4000/product"

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpclient: HttpClient) { }

  getStoreData(): Observable<any> {
    return this.httpclient.get(`${mainStoreUrlPath}/mainstorepage`);
  };

  getProductsByCategory(category: ICategory): Observable<any> {
    return this.httpclient.get(`${mainProductUrlPath}/oncategory?q=${category.category}`);
  };

  getProductsBySearchString(searchString: ISearch): Observable<any> {
    return this.httpclient.get(`${mainProductUrlPath}/search?q=${searchString}`);
  };

  addProduct(productInfo: IProduct): Observable<any> {
    return this.httpclient.post(`${mainProductUrlPath}/addproduct`, productInfo);
  };

  updateProduct(updateInfo: IProduct): Observable<any> {
    return this.httpclient.put(`${mainProductUrlPath}/updateproduct`, updateInfo);
  };
};
