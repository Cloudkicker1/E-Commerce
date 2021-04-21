import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { addProductFail, addProductRequest, addProductSuccess, deleteFromCartFail, deleteFromCartRequest, deleteFromCartSuccess, getCartFail, getCartRequest, getCartSuccess, getProductsByCategoryFail, getProductsByCategoryRequest, getProductsByCategorySuccess, getProductsBySearchFail, getProductsBySearchRequest, getProductsBySearchSuccess, getStoreDataFail, getStoreDataRequest, getStoreDataSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../Actions/store.actions';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { StoreService } from 'src/app/Services/storeServices/store.service';
import { CartService } from 'src/app/Services/cartServices/cart.service';
// import { userInfo } from 'os';

@Injectable()
export class StoreEffects {

    storeData$ = createEffect(() => this.actions$.pipe(
        ofType(getStoreDataRequest),
        exhaustMap(() => this.storeService.getStoreData()
            .pipe(
                map(storeData => getStoreDataSuccess(storeData),
                    catchError(error => of(getStoreDataFail({ error })))
                ))
        )
    ));

    getCart$ = createEffect(() => this.actions$.pipe(
        ofType(getCartRequest),
        exhaustMap(() => this.cartService.getCart()
            .pipe(
                map(userCart => getCartSuccess(userCart),
                    catchError(error => of(getCartFail({ error })))
                ))
        )
    ));

    deleteFromCart$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFromCartRequest),
        exhaustMap((action) => this.cartService.deleteFromCart(action.productToDelete)
            .pipe(
                map(deletedProduct => deleteFromCartSuccess(deletedProduct),
                    catchError(error => of(deleteFromCartFail({ error })))
                ))
        )
    ));

    cartProductsByCategory$ = createEffect(() => this.actions$.pipe(
        ofType(getProductsByCategoryRequest),
        exhaustMap(action => this.storeService.getProductsByCategory(action.category)
            .pipe(
                map(sortedProducts => getProductsByCategorySuccess(sortedProducts),
                    catchError(error => of(getProductsByCategoryFail({ error })))
                ))
        )
    ));

    productsBySearchString$ = createEffect(() => this.actions$.pipe(
        ofType(getProductsBySearchRequest),
        exhaustMap(action => this.storeService.getProductsBySearchString(action.searchString)
            .pipe(
                map(sortedProducts => getProductsBySearchSuccess(sortedProducts),
                    catchError(error => of(getProductsBySearchFail({ error })))
                ))
        )
    ));

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(addProductRequest),
        exhaustMap((action) => this.storeService.addProduct(action.productInfo)
            .pipe(
                map(msg => addProductSuccess(msg),
                    catchError(error => of(addProductFail({ error })))
                ))
        )
    ));

    addProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(addProductSuccess, updateProductSuccess),
        map(() => getStoreDataRequest())
    ));

    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(updateProductRequest),
        exhaustMap((action) => this.storeService.updateProduct(action.updateInfo)
            .pipe(
                map(msg => updateProductSuccess(msg),
                    catchError(error => of(updateProductFail({ error })))
                ))
        )
    ));


    constructor(
        private actions$: Actions,
        private storeService: StoreService,
        private cartService: CartService,
    ) { }
}