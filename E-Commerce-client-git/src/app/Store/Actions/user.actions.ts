import { createAction, props } from '@ngrx/store';
import { LoginModel } from '../../models/userModels/login.model';
import { FirstStepUser, User } from 'src/app/models/userModels/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AddedProduct } from 'src/app/Models/userModels/addedProduct.model';
import { IProductId } from 'src/app/Models/storeModels/product.models';
import { IOrder } from 'src/app/Models/checkoutModels/order.model';


export const loginRequest = createAction('[USERS] Login request', props<{ loginInfo: LoginModel }>());
export const loginSuccess = createAction('[USERS] Login success', props<{ token: string, success: boolean, currentUser: User }>());
export const loginFail = createAction('[USERS] Login fail', props<{ error: HttpErrorResponse }>());

export const logoutSuccess = createAction('[USERS] logout success');

export const getUserInfoRequest = createAction('[USERS] getUserInfo request');
export const getUserInfoSuccess = createAction('[USERS] getUserInfo success', props<{ userInfo: User }>());
export const getUserInfoFail = createAction('[USERS] getUserInfo fail', props<{ error: HttpErrorResponse }>());

export const firstStepRegistrationRequest = createAction('[USERS] firstStepRegistration request', props<{ firstStepRegistrationInfo: FirstStepUser }>());
export const firstStepRegistrationSuccess = createAction('[USERS] firstStepRegistration success', props<{ messege: string, firstStepRegistrationInfo: FirstStepUser }>());
export const firstStepRegistrationFail = createAction('[USERS] firstStepRegistration fail', props<{ error: HttpErrorResponse }>());

export const secondStepRegistrationRequest = createAction('[USERS] secondStepRegistration request', props<{ secondStepRegistrationInfo: User }>());
export const secondStepRegistrationSuccess = createAction('[USERS] secondStepRegistration success', props<{ messege: string, token: string, newUser: User }>());
export const secondStepRegistrationFail = createAction('[USERS] secondStepRegistration fail', props<{ error: HttpErrorResponse }>());

export const addToCartRequest = createAction('[USERS] addToCart request', props<{ productToAdd: AddedProduct }>());
export const addToCartSuccess = createAction('[USERS] addToCart success', props<{ productId: IProductId, amount: number, msg: string }>());
export const addToCartFail = createAction('[USERS] addToCart fail', props<{ error: HttpErrorResponse }>());

export const placeOrderRequest = createAction('[CHECKOUT] placeOrder request', props<{ orderInfo: IOrder }>());
export const placeOrderSuccess = createAction('[CHECKOUT] placeOrder success', props<{ msg: string }>());
export const placeOrderFail = createAction('[CHECKOUT] placeOrder fail', props<{ error: HttpErrorResponse }>());

