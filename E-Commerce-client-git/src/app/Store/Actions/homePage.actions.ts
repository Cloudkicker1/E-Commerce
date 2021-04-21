import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IOrdersSummery } from 'src/app/Models/homePageModels/ordersSummery.model';
import { IProductsSummery } from 'src/app/Models/homePageModels/productsSummery.model';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';



export const getInfoSummeryRequest = createAction('[HOMEPAGE] getInfoSummery request');
export const getInfoSummerySuccess = createAction('[HOMEPAGE] getInfoSummery success', props<{ ordersSummery: IOrdersSummery, productsSummery: IProductsSummery }>());
export const getInfoSummeryFail = createAction('[HOMEPAGE] getInfoSummery fail', props<{ error: HttpErrorResponse }>());

export const lastOrderRequest = createAction('[HOMEPAGE] lastOrder request');
export const lastOrderSuccess = createAction('[HOMEPAGE] lastOrder success', props<{ lastUserOrder: IOrder }>());
export const lastOrderFail = createAction('[HOMEPAGE] lastOrder fail', props<{ error: HttpErrorResponse }>());