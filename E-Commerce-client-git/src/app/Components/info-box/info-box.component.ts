import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from 'src/app/app.module';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';
import { IOrdersSummery } from 'src/app/Models/homePageModels/ordersSummery.model';
import { IProductsSummery } from 'src/app/Models/homePageModels/productsSummery.model';
import { ICart } from 'src/app/Models/storeModels/cart.model';
import { getInfoSummeryRequest, lastOrderRequest } from 'src/app/Store/Actions/homePage.actions';
import { getCartRequest } from 'src/app/Store/Actions/store.actions';


@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  numOfOrders$: Observable<IOrdersSummery>;
  numOfProducts$: Observable<IProductsSummery>;
  userLastOrder$: Observable<IOrder>;
  activeCart$: Observable<ICart>;
  isLoggedin$: Observable<boolean>;

  userLastOrderDate: number;
  isLoggedIn: boolean;

  constructor(private _store: Store<IState>) {
    this.numOfOrders$ = _store.select(state => state.homePage.ordersSummery);
    this.numOfProducts$ = _store.select(state => state.homePage.productsSummery);
    this.userLastOrder$ = _store.select(state => state.homePage.userLastOrder);
    this.activeCart$ = _store.select(state => state.store.userCart);
    this.isLoggedin$ = _store.select(state => state.user.isLoggedin);
  };

  ngOnInit(): void {
    this.isLoggedin$.subscribe(value => {
      this.isLoggedIn = value
    })
    if (this.isLoggedIn) {
      this.getShoppingInfo()
    }
    this._store.dispatch(getInfoSummeryRequest());
  };

  getShoppingInfo() {
    this._store.dispatch(lastOrderRequest());
    this._store.dispatch(getCartRequest());
  }
};



