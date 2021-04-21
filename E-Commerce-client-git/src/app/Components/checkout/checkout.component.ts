import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from 'src/app/app.module';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';
import { ICart, ICartProduct } from 'src/app/Models/storeModels/cart.model';
import { IProduct } from 'src/app/Models/storeModels/product.models';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { Orderservice } from 'src/app/Services/orderServices/orderservice.service';
import { placeOrderRequest } from 'src/app/Store/Actions/user.actions';
import { deleteFromCartRequest, getCartRequest, getStoreDataRequest } from 'src/app/Store/Actions/store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/Services/cartServices/cart.service';

const V = Validators

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm = new FormGroup({
    city: new FormControl('', V.required),
    street: new FormControl('', V.required),
    shippingDate: new FormControl('', V.required),
    creditCard: new FormControl('', V.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')),
  })

  staticStoreProductList$: Observable<IProduct[]>;
  userCart$: Observable<ICart>;
  deletedProduct$: Observable<IProduct>;
  msg$: Observable<string>;

  userCartProducts: IProduct[]
  msg: string;
  priceSum: number;
  content: string;

  constructor(private _store: Store<IState>, private router: Router, private orderService: Orderservice, private _snackBar: MatSnackBar, private _cartService: CartService) {
    this.staticStoreProductList$ = _store.select(state => state.store.staticStoreProductList);
    this.userCart$ = _store.select(state => state.store.userCart);
    this.deletedProduct$ = _store.select(state => state.store.deletedProduct);
    this.msg$ = _store.select(state => state.user.viewMsg);
  }

  ngOnInit(): void {
    this.loadStoreData();
    this.filterCartProducts()
    this.deletedProduct$.subscribe(value => {
      if (!value) {
        return
      } else {
        const productTtlPRice = (value.amount * Number(value.price));
        this.priceSum -= productTtlPRice;
      }
    });
  };

  filterCartProducts() {
    this.staticStoreProductList$.subscribe((value) => {
      this.userCart$.subscribe((cartValue) => {
        if (!cartValue) {
          return
        }
        this.userCartProducts = cartValue[0]?.products.map((cartProduct) => {
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

  checkoutRouting = {
    mainstorepage: () => this.router.navigateByUrl('/mainstorepage'),
  }

  onSubmit() {
    const { city, street, shippingDate, creditCard } = this.checkoutForm.value;
    city.trim();
    street.trim();
    shippingDate.trim();
    creditCard.trim();

    const dateValid = this.orderService.dateValidator(shippingDate)
    dateValid.subscribe(value => {
      if (value.isValid) {
        const orderInfo: IOrder = { city, street, shippingDate, creditCard, creationDate: Date.now(), ttlPrice: this.priceSum };
        this._store.dispatch(placeOrderRequest({ orderInfo }));

        this.msg = value.msg
        const snackBarRef = this._snackBar.open(this.msg, 'Download receipt', {
          duration: 3000
        });
        snackBarRef.onAction().subscribe(() => this.downloadReceipt(city, street, shippingDate, creditCard));

        this.checkoutForm.reset();
      } else {
        this.msg = value.msg
        this._snackBar.open(this.msg, '', {
          duration: 2000
        });
      }
    });
  };

  deleteFromCart(productId: IProductId, amount: number) {
    this._store.dispatch(deleteFromCartRequest({ productToDelete: { productId, amount } }));
    this._store.dispatch(getCartRequest());
  };

  loadStoreData() {
    this._store.dispatch(getCartRequest());
    this._store.dispatch(getStoreDataRequest());
  };

  download(dataContent: any) {
    const blob = new Blob([dataContent], { type: 'text/csv' });
    this.downloadFile(blob, 'receipt.txt');
  }

  downloadFile(blob: any, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }

  downloadReceipt(city: string, street: string, shippingDate: string, creditCard: string) {
    this.content =
      this.userCartProducts?.map((product: IProduct) => {
        return (
          product.name +
          '\n' +
          product.amount +
          ' * ' +
          product.price +
          '\n\n'
        );
      }) +
      '\n Total = ₪' +
      this.priceSum.toFixed(2) +
      '\n Shipping date = ' +
      shippingDate +
      '\n City = ' +
      city +
      '\n Creation Date = ' +
      new Date(Date.now()) +
      '\n Credit card = ' +
      creditCard +
      '\n Street = ' +
      street +
      '\n\n Thank you for choosing SuperNir!';

    this.download(this.content);
  };
};
