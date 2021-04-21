import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/app.module';
import { getProductsByCategoryRequest, getProductsBySearchRequest, getStoreDataRequest, updateProductRequest } from 'src/app/Store/Actions/store.actions';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/Models/storeModels/product.models';
import { ICategory } from 'src/app/Models/storeModels/category.model';
import { addToCartRequest } from 'src/app/Store/Actions/user.actions';
import { AddedProduct } from 'src/app/Models/userModels/addedProduct.model';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { ISearch } from 'src/app/Models/storeModels/search.model';
import { ICart } from 'src/app/Models/storeModels/cart.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/popup/popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const V = Validators;

@Component({
  selector: 'app-store-data',
  templateUrl: './store-data.component.html',
  styleUrls: ['./store-data.component.css']
})
export class StoreDataComponent implements OnInit {

  updateProductForm = new FormGroup({
    name: new FormControl('', V.required),
    category: new FormControl('', V.required),
    price: new FormControl('', V.required),
    image: new FormControl('', [V.required]),
    amount: new FormControl('', V.required),
  })

  productsList$: Observable<IProduct[]>;
  categoriesList$: Observable<ICategory[]>;
  userCart$: Observable<ICart>;
  userRole$: Observable<string>
  msg$: Observable<string>

  searchString: ISearch;
  isMsg: boolean;
  isPopup: boolean;
  role: string;
  isUpdate: boolean = false;
  ttlCartPrice: number;


  name: null
  category: null
  price: null
  image: null
  amount: null
  _id: null


  constructor(private _store: Store<IState>, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.productsList$ = _store.select(state => state.store.storeProductList);
    this.categoriesList$ = _store.select(state => state.store.categoriesList);
    this.userRole$ = _store.select(state => state.user.role);
    this.userCart$ = _store.select(state => state.store.userCart);
    this.msg$ = _store.select(state => state.store.msg);
  };

  ngOnInit(): void {
    this._store.dispatch(getStoreDataRequest());
    this.userRole$.subscribe(value => {
      this.role = value;
    })
  };

  updateProduct() {
    const { name, category, price, image, amount } = this.updateProductForm.value;
    name.trim();
    category.trim();
    price.trim();
    image.trim();

    const updateInfo = { name, category, price, image, amount, _id: this._id };
    this._store.dispatch(updateProductRequest({ updateInfo }));
    this.openSnackBar()
    this.updateProductForm.reset();
    this.isUpdate = false;
  };

  addToCart(productId: IProductId, amount: number) {
    if (!amount) {
      return this._snackBar.open('Amount must be set', '', {
        duration: 2000
      });
    }
    const productToAdd: AddedProduct = { productId, amount: amount }
    this._store.dispatch(addToCartRequest({ productToAdd }));
    this.openSnackBar();
  }

  getAllProducts() {
    this._store.dispatch(getStoreDataRequest())
  };

  getProductsByCategoty(category: ICategory) {
    this._store.dispatch(getProductsByCategoryRequest({ category }));
  };

  search = () => {
    const searchString = this.searchString
    this._store.dispatch((getProductsBySearchRequest({ searchString })));
  }

  changeFocusedProduct(focusedName: any, focusedCategory: any, focusedPrice: any, focusedImage: any, focusedAmount: any, focused_id: any) {
    if (this.name !== focusedName) {
      this.name = focusedName;
      this.category = focusedCategory;
      this.price = focusedPrice;
      this.image = focusedImage;
      this.amount = focusedAmount;
      this._id = focused_id;
      this.toggleUpdateProductBox()
    }
  };

  toggleUpdateProductBox() {
    if (this.role === 'admin') {
      this.isUpdate = !this.isUpdate
    };
    return
  };

  openDialog(productId: IProductId, price: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addToCart(productId, result);
    });
  };

  openSnackBar() {
    this.msg$.subscribe(value => {
      this._snackBar.open(value, '', {
        duration: 2000
      });
    })
  }
};
