import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { MainStorePageComponent } from './Components/main-store-page/main-store-page.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';



const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: 'mainstorepage', component: MainStorePageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'loggedhomepage', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
