import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginboxComponent } from './Components/loginbox/loginbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdBoxComponent } from './Components/ad-box/ad-box.component';
import { InfoBoxComponent } from './Components/info-box/info-box.component'
import { HomePageService } from './Services/homePageServices/homePage.service'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { IUserState, userReducer } from './Store/Reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './Store/Effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { MainStorePageComponent } from './Components/main-store-page/main-store-page.component';
import { StoreDataComponent } from './Components/store-data/store-data.component';
import { IStoreState, storeReducer } from './Store/Reducers/store.reducer';
import { StoreEffects } from './Store/Effects/store.effects';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '.';
import { homePageReducer, IHomePageState } from './Store/Reducers/homePage.reducer';
import { CartComponent } from './Components/cart/cart.component';
import { HomePageEffects } from './Store/Effects/homePage.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { PopupComponent } from './popup/popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';



export interface IState {
  user: IUserState;
  store: IStoreState;
  homePage: IHomePageState;
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginboxComponent,
    AdBoxComponent,
    InfoBoxComponent,
    RegistrationPageComponent,
    HomePageComponent,
    MainStorePageComponent,
    StoreDataComponent,
    CartComponent,
    AddProductComponent,
    CheckoutComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot<IState>({ user: userReducer, store: storeReducer, homePage: homePageReducer }),
    EffectsModule.forRoot([UserEffects, StoreEffects, HomePageEffects]),
    StoreDevtoolsModule.instrument({}),
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  entryComponents: [
    PopupComponent
  ],
  providers: [HomePageService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
