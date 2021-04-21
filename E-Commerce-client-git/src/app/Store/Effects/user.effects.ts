import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/Services/userServices/user-service';
import { loginRequest, loginSuccess, loginFail, firstStepRegistrationRequest, firstStepRegistrationSuccess, firstStepRegistrationFail, addToCartRequest, addToCartSuccess, addToCartFail, getUserInfoRequest, getUserInfoSuccess, getUserInfoFail, secondStepRegistrationSuccess, secondStepRegistrationRequest, secondStepRegistrationFail, placeOrderRequest, placeOrderSuccess, placeOrderFail } from '../Actions/user.actions';
import { CartService } from 'src/app/Services/cartServices/cart.service';
import { saveToken } from 'src/app/token';
import { Orderservice } from 'src/app/Services/orderServices/orderservice.service';
import { lastOrderRequest } from '../Actions/homePage.actions';
import { getCartRequest } from '../Actions/store.actions';

@Injectable()
export class UserEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        exhaustMap((action) => this.userService.login(action.loginInfo)
            .pipe(
                map(user => loginSuccess(user),
                    catchError(error => of(loginFail({ error })))
                ))
        )
    ));

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        mergeMap(() => [lastOrderRequest(), getCartRequest()]
        )
    ));

    saveToken$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess, secondStepRegistrationSuccess),
        tap(action => { saveToken(action.token) })
    ), { dispatch: false }
    );

    firstStepRegisteration$ = createEffect(() => this.actions$.pipe(
        ofType(firstStepRegistrationRequest),
        exhaustMap((action) => this.userService.firstRegister(action.firstStepRegistrationInfo)
            .pipe(
                map(firstStepRegistrationInfo => firstStepRegistrationSuccess(firstStepRegistrationInfo),
                    catchError(error => of(firstStepRegistrationFail({ error })))
                ))
        )
    ));

    secondStepRegisteration$ = createEffect(() => this.actions$.pipe(
        ofType(secondStepRegistrationRequest),
        exhaustMap((action) => this.userService.secondRegister(action.secondStepRegistrationInfo)
            .pipe(
                map(secondStepRegistrationInfo => secondStepRegistrationSuccess(secondStepRegistrationInfo),
                    catchError(error => of(secondStepRegistrationFail({ error })))
                ))
        )
    ));

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(addToCartRequest),
        exhaustMap((action) => this.cartService.addToCart(action.productToAdd)
            .pipe(
                map(productToAdd => addToCartSuccess(productToAdd),
                    catchError(error => of(addToCartFail({ error })))
                ))
        )
    ));

    addToCartSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(addToCartSuccess),
        map(() => getCartRequest()
        )
    ));

    userInfo$ = createEffect(() => this.actions$.pipe(
        ofType(getUserInfoRequest),
        mergeMap(() => this.userService.userInfo()
            .pipe(
                map(userInfo => getUserInfoSuccess({ userInfo }),
                    catchError(error => of(getUserInfoFail({ error })))
                ))
        )
    ));

    placeOrder$ = createEffect(() => this.actions$.pipe(
        ofType(placeOrderRequest),
        exhaustMap((action) => this.orderService.placeOrder(action.orderInfo)
            .pipe(
                map(msg => placeOrderSuccess(msg),
                    catchError(error => of(placeOrderFail({ error })))
                ))
        )
    ));

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private orderService: Orderservice,
        private cartService: CartService,
    ) { }
}