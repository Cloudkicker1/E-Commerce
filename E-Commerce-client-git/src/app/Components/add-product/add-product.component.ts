import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from 'src/app/app.module';
import { addProductRequest, getStoreDataRequest } from 'src/app/Store/Actions/store.actions';

const V = Validators;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  msg$: Observable<string>

  addProductForm = new FormGroup({
    name: new FormControl('', V.required),
    category: new FormControl('', V.required),
    price: new FormControl('', V.required),
    image: new FormControl('', [V.required]),
    amount: new FormControl('', V.required),
  })


  constructor(private _store: Store<IState>, private _snackBar: MatSnackBar) {
    this.msg$ = this._store.select(state => state.store.msg)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const { name, category, price, image, amount } = this.addProductForm.value;
    name.trim();
    category.trim();
    price.trim();
    image.trim();

    const productInfo = { name, category, price, image, amount };
    this._store.dispatch(addProductRequest({ productInfo }));
    this.openSnackBar()
    this.addProductForm.reset();
  };

  openSnackBar() {
    this.msg$.subscribe(value => {
      this._snackBar.open(value, '', {
        duration: 2000
      });
    });
  };

};
