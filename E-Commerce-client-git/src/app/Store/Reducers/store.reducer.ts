import { createReducer, on } from '@ngrx/store';
import { addProductFail, addProductRequest, addProductSuccess, deleteFromCartFail, deleteFromCartRequest, deleteFromCartSuccess, getCartFail, getCartRequest, getCartSuccess, getProductsByCategoryFail, getProductsByCategoryRequest, getProductsByCategorySuccess, getProductsBySearchFail, getProductsBySearchRequest, getProductsBySearchSuccess, getStoreDataFail, getStoreDataRequest, getStoreDataSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../Actions/store.actions';
import { IProduct } from 'src/app/Models/storeModels/product.models';
import { ICategory } from 'src/app/Models/storeModels/category.model';
import { addToCartFail, addToCartRequest, addToCartSuccess } from '../Actions/user.actions';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { ICart } from 'src/app/Models/storeModels/cart.model';


export interface IStoreState {
    staticStoreProductList: IProduct[] | null;
    storeProductList: IProduct[] | null;
    categoriesList: ICategory[] | null;
    userCart: ICart | null;
    deletedProduct: IProduct | null;
    productId: IProductId | null;
    amount: number | null;
    errorMsg: any | null;
    msg: string | null;
    showCart: boolean;
}

export const initialState: IStoreState = {
    staticStoreProductList: null,
    storeProductList: null,
    categoriesList: null,
    userCart: null,
    deletedProduct: null,
    productId: null,
    amount: null,
    msg: null,
    errorMsg: null,
    showCart: false,
};

const _storeReducer = createReducer(
    initialState,

    // GET STORE DATA 

    on(getStoreDataRequest, (state) => state),
    on(getStoreDataSuccess, (state, { categories, products }) => ({
        ...state,
        staticStoreProductList: products,
        storeProductList: products,
        categoriesList: categories,
    })),
    on(getStoreDataFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error,
    })),

    // GET CART PRODUCTS

    on(getCartRequest, (state) => state),
    on(getCartSuccess, (state, { userCart }) => ({
        ...state,
        userCart: userCart,
        deletedProduct: null,
    })),
    on(getCartFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error,
    })),

    // ADD PRODUCT TO CART

    on(addToCartRequest, (state) => state),
    on(addToCartSuccess, (state, { productId, amount, msg }) => ({
        ...state,
        productId: productId,
        amount: amount,
        msg: msg,
        showCart: true
    })),
    on(addToCartFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),

    // ADD PRODUCT TO STORE

    on(addProductRequest, (state) => state),
    on(addProductSuccess, (state, { msg }) => ({
        ...state,
        msg: msg
    })),
    on(addProductFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),

    on(updateProductRequest, (state) => state),
    on(updateProductSuccess, (state, { msg }) => ({
        ...state,
        msg: msg
    })),
    on(updateProductFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),

    // DELETE FROM CART

    on(deleteFromCartRequest, (state) => state),
    on(deleteFromCartSuccess, (state, { deletedProduct }) => ({
        ...state,
        deletedProduct: deletedProduct,
    })),
    on(deleteFromCartFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),

    // CATEGORY FILTERING

    on(getProductsByCategoryRequest, (state) => state),
    on(getProductsByCategorySuccess, (state, { sortedProducts }) => ({
        ...state,
        storeProductList: sortedProducts,
    })),
    on(getProductsByCategoryFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),

    // SEARCH FILTERING

    on(getProductsBySearchRequest, (state) => state),
    on(getProductsBySearchSuccess, (state, { sortedProducts }) => ({
        ...state,
        storeProductList: sortedProducts,
    })),
    on(getProductsBySearchFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error
    })),
);

export function storeReducer(state, action) {
    return _storeReducer(state, action);
}