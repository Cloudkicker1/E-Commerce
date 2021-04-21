import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../Store/Actions/user.actions';
import { Observable } from 'rxjs';
import { IState } from '../../app.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastOrderRequest } from 'src/app/Store/Actions/homePage.actions';
import { getCartRequest } from 'src/app/Store/Actions/store.actions';


const V = Validators;

@Component({
  selector: 'app-loginbox',
  templateUrl: './loginbox.component.html',
  styleUrls: ['./loginbox.component.css']
})
export class LoginboxComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  token$: Observable<string>;
  msg$: Observable<string>

  loginForm = new FormGroup({
    userName: new FormControl('', V.required),
    pass: new FormControl('', V.required),
  });

  isLoggedIn: boolean = false

  constructor(private _store: Store<IState>, private router: Router, private _snackBar: MatSnackBar) {
    this.loggedIn$ = _store.select(state => state.user.isLoggedin);
    this.token$ = _store.select(state => state.user.token);
    this.msg$ = this._store.select(state => state.user.viewMsg)
  };

  ngOnInit(): void {
    this.loggedIn$.subscribe(value => {
      this.isLoggedIn = value
    })
  }

  onSubmit() {
    const { userName, pass } = this.loginForm.value;
    userName.trim();
    pass.trim();
    const loginInfo = { userName, pass };
    this._store.dispatch(loginRequest({ loginInfo }));
    this.loginForm.reset();
  };

  openSnackBar() {
    this.msg$.subscribe(value => {
      this._snackBar.open(value, '', {
        duration: 2000
      });
    })
  }

  loginRouting = {
    mainStorePage: () => this.router.navigateByUrl('/mainstorepage'),
    registerPage: () => this.router.navigateByUrl('/register'),
  }
};
