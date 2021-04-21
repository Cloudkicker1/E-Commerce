import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../../app.module';
import { getUserInfoRequest, logoutSuccess } from '../../Store/Actions/user.actions';
import { clearToken } from '../../token';
import { Router } from '@angular/router';
import { getProductsBySearchRequest } from 'src/app/Store/Actions/store.actions';
import { ISearch } from 'src/app/Models/storeModels/search.model';
import { CartService } from 'src/app/Services/cartServices/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name$: Observable<string>;
  loggedIn$: Observable<boolean>;

  title = "Super Nir!";
  email = "Nirg6888@gmail.com";
  phoneNum = "0525286461";

  constructor(private _store: Store<IState>, private router: Router, private _cartService: CartService) {
    this.name$ = this._store.select(state => state.user.name);
    this.loggedIn$ = this._store.select(state => state.user.isLoggedin);
  };

  logoutRouting = {
    backToHomePage: () => this.router.navigateByUrl('/homepage'),
  };

  logout = () => {
    this._cartService.deleteEmptyCart().subscribe()
    clearToken()
    this.logoutRouting.backToHomePage();
    this._store.dispatch(logoutSuccess());
  };

  ngOnInit(): void {
    this.loggedIn$.subscribe(value => {
      if (value) {
        this._store.dispatch(getUserInfoRequest());
      };
    });
  };
};


