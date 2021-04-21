import { createReducer, on, State } from '@ngrx/store';
import { getInfoSummeryFail, getInfoSummeryRequest, getInfoSummerySuccess, lastOrderFail, lastOrderRequest, lastOrderSuccess } from '../Actions/homePage.actions';

import { IOrdersSummery } from 'src/app/Models/homePageModels/ordersSummery.model';
import { IProductsSummery } from 'src/app/Models/homePageModels/productsSummery.model';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';


export interface IHomePageState {
    ordersSummery: IOrdersSummery | null;
    productsSummery: IProductsSummery | null;
    msg: string | null;
    userLastOrder: IOrder | null;
}

export const initialState: IHomePageState = {
    ordersSummery: null,
    productsSummery: null,
    msg: null,
    userLastOrder: null,
};

const _homePageReducer = createReducer(
    initialState,
    on(getInfoSummeryRequest, (state) => state),
    on(getInfoSummerySuccess, (state, { ordersSummery, productsSummery }) => ({
        ...state,
        ordersSummery: ordersSummery,
        productsSummery: productsSummery
    })),
    on(getInfoSummeryFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error,
    })),

    on(lastOrderRequest, (state) => state),
    on(lastOrderSuccess, (state, { lastUserOrder }) => ({
        ...state,
        userLastOrder: lastUserOrder
    })),
    on(lastOrderFail, (state, { error }) => ({
        ...state,
        msg: 'Something went wrong',
        errorMsg: error,
    })),
);

export function homePageReducer(state, action) {
    return _homePageReducer(state, action);
}