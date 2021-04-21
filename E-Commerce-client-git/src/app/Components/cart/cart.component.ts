import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from 'src/app/app.module';
import { ICart, ICartProduct } from 'src/app/Models/storeModels/cart.model';
import { IProduct } from 'src/app/Models/storeModels/product.models';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { deleteFromCartRequest, getCartRequest } from 'src/app/Store/Actions/store.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  staticStoreProductList$: Observable<IProduct[]>;
  userCart$: Observable<ICart>;
  deletedProduct$: Observable<IProduct>;

  userCartProducts: IProduct[]
  priceSum: number;

  constructor(private _store: Store<IState>, private router: Router) {
    this.staticStoreProductList$ = _store.select(state => state.store.staticStoreProductList);
    this.userCart$ = _store.select(state => state.store.userCart);
    this.deletedProduct$ = _store.select(state => state.store.deletedProduct);
  }

  ngOnInit(): void {
    this.filterCartProducts()
    this.deletedProduct$.subscribe(value => {
      if (!value) {
        return
      } else {
        const productTtlPRice = (value.amount * Number(value.price));
        this.priceSum -= productTtlPRice;
      }
    });
  }

  filterCartProducts() {
    this.staticStoreProductList$.subscribe((value) => {
      this.userCart$.subscribe((cartValue) => {
        if (!cartValue) {
          return
        }
        this.userCartProducts = cartValue?.products.map((cartProduct) => {
          const matchedProducts = value?.find((product) => {
            return cartProduct.productID === product._id
          });
          const clonedMatchedProducts = { ...matchedProducts };
          clonedMatchedProducts.amount = cartProduct.amount;
          return clonedMatchedProducts;
        });
      });
      this.ttlPrice()
    });
  };

  checkoutRouting = {
    checkoutPage: () => this.router.navigateByUrl('/checkout'),
  }

  deleteFromCart(productId: IProductId, amount: number) {
    this._store.dispatch(deleteFromCartRequest({ productToDelete: { productId, amount } }))
    this._store.dispatch(getCartRequest())
  }

  checkout() {
    this.checkoutRouting.checkoutPage()
  }

  ttlPrice() {
    if (!this.userCartProducts) {
      return
    }
    this.priceSum =
      this.userCartProducts?.reduce((total, product) => {
        total += (product.amount * Number(product.price));
        return total;
      }, 0);
  };
};