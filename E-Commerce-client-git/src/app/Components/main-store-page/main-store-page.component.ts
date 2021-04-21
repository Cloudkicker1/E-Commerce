import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { IState } from 'src/app/app.module';
import { getCartRequest } from 'src/app/Store/Actions/store.actions';

@Component({
  selector: 'app-main-store-page',
  templateUrl: './main-store-page.component.html',
  styleUrls: ['./main-store-page.component.css']
})
export class MainStorePageComponent implements OnInit {

  showCart$: Observable<boolean>;
  userRole$: Observable<string>;
  isCart: boolean;
  isAddProduct: boolean;

  constructor(private _store: Store<IState>) {
    this.showCart$ = _store.select(state => state.store.showCart);
    this.userRole$ = _store.select(state => state.user.role);
  }

  ngOnInit(): void {
    this._store.dispatch(getCartRequest())
  }

  toggleCart() {
    this.isCart = !this.isCart;
  }

  toggleAddproduct() {
    this.isAddProduct = !this.isAddProduct
  }
};
