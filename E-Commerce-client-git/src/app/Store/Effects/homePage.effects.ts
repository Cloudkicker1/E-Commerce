import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { getInfoSummeryFail, getInfoSummeryRequest, getInfoSummerySuccess, lastOrderFail, lastOrderRequest, lastOrderSuccess } from '../Actions/homePage.actions';
import { HomePageService } from 'src/app/Services/homePageServices/homePage.service';

@Injectable()
export class HomePageEffects {

    infoSummery$ = createEffect(() => this.actions$.pipe(
        ofType(getInfoSummeryRequest),
        mergeMap(() => this.homePageService.getInfoSummery()
            .pipe(
                map(infoSummery => getInfoSummerySuccess(infoSummery),
                    catchError(error => of(getInfoSummeryFail({ error })))
                ))
        )
    ));

    lastOrder$ = createEffect(() => this.actions$.pipe(
        ofType(lastOrderRequest),
        mergeMap(() => this.homePageService.lastOrder()
            .pipe(
                map(lastUserOrder => lastOrderSuccess(lastUserOrder),
                    catchError(error => of(lastOrderFail({ error })))
                ))
        )
    ));

    constructor(
        private actions$: Actions,
        private homePageService: HomePageService,
    ) { }
}