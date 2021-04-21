import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct, IProductToDelete } from 'src/app/Models/storeModels/product.models';
import { ICategory } from 'src/app/Models/storeModels/category.model';
import { ICart, ICartProduct } from 'src/app/Models/storeModels/cart.model';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { ISearch } from 'src/app/Models/storeModels/search.model';


export const getStoreDataRequest = createAction('[STORE] getStoreData request');
export const getStoreDataSuccess = createAction('[STORE] getStoreData success', props<{ categories: ICategory[], products: IProduct[] }>());
export const getStoreDataFail = createAction('[STORE] getStoreData fail', props<{ error: HttpErrorResponse }>());

export const getCartRequest = createAction('[STORE] getCart request');
export const getCartSuccess = createAction('[STORE] getCart success', props<{ userCart: ICart }>());
export const getCartFail = createAction('[STORE] getCart fail', props<{ error: HttpErrorResponse }>());

export const deleteFromCartRequest = createAction('[STORE] deleteFromCart request', props<{ productToDelete: IProductToDelete }>());
export const deleteFromCartSuccess = createAction('[STORE] deleteFromCart success', props<{ deletedProduct: IProduct }>());
export const deleteFromCartFail = createAction('[STORE] deleteFromCart fail', props<{ error: HttpErrorResponse }>());

export const getProductsByCategoryRequest = createAction('[STORE] getProductsByCategory request', props<{ category: ICategory }>());
export const getProductsByCategorySuccess = createAction('[STORE] getProductsByCategory success', props<{ sortedProducts: IProduct[] }>());
export const getProductsByCategoryFail = createAction('[STORE] getProductsByCategory fail', props<{ error: HttpErrorResponse }>());

export const addProductRequest = createAction('[STORE] addProduct request', props<{ productInfo: any }>());
export const addProductSuccess = createAction('[STORE] addProduct success', props<{ msg: string }>());
export const addProductFail = createAction('[STORE] addProduct fail', props<{ error: HttpErrorResponse }>());

export const updateProductRequest = createAction('[STORE] updateProduct request', props<{ updateInfo: any }>());
export const updateProductSuccess = createAction('[STORE] updateProduct success', props<{ msg: string }>());
export const updateProductFail = createAction('[STORE] updateProduct fail', props<{ error: HttpErrorResponse }>());

export const getProductsBySearchRequest = createAction('[STORE] getProductsBySearch request', props<{ searchString: ISearch }>());
export const getProductsBySearchSuccess = createAction('[STORE] getProductsBySearch success', props<{ sortedProducts: IProduct[] }>());
export const getProductsBySearchFail = createAction('[STORE] getProductsBySearch fail', props<{ error: HttpErrorResponse }>());