import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../../app.module';
import { firstStepRegistrationRequest, getUserInfoRequest, secondStepRegistrationRequest } from '../../Store/Actions/user.actions';
import { Router } from '@angular/router';
import { FirstStepUser, User } from 'src/app/models/userModels/user.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/Models/homePageModels/cities.model';

const V = Validators;


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  isSecondStep: boolean = false;

  firstRegistrationInfo$: Observable<FirstStepUser>;
  msg$: Observable<string>;

  firstStepRegistrationForm = new FormGroup({
    userName: new FormControl('', V.required),
    idNumber: new FormControl('', [V.required, V.minLength(9)]),
    password: new FormControl('', V.required),
    confirmPassword: new FormControl('', V.required),
  })

  secondStepRegistrationForm = new FormGroup({
    name: new FormControl('', V.required),
    lastName: new FormControl('', V.required),
    city: new FormControl('', V.required),
    street: new FormControl('', V.required),
  })

  cities: City[] = [
    { value: 'Tel-Aviv-0', viewValue: 'Tel Aviv' }, { value: 'Jerusalem-1', viewValue: 'Jerusalem' },
    { value: 'Haifa-2', viewValue: 'Haifa' }, { value: 'Beer Sheva-3', viewValue: 'Beer Sheva' },
    { value: 'Natenya-4', viewValue: 'Netanya' }, { value: 'Rishon-Le-Zion-5', viewValue: 'Rishon Le Zion' },
    { value: 'Rehovot-6', viewValue: 'Rehovot' }, { value: 'Eilat-7', viewValue: 'Eilat' },
    { value: 'Kfar-Saba-8', viewValue: 'Kfar Saba' }, { value: 'Kiryat-Shmona-9', viewValue: 'Kiryat Shmona' },
  ];


  constructor(private _store: Store<IState>, private router: Router, private _snackBar: MatSnackBar) {
    this.firstRegistrationInfo$ = this._store.select(state => state.user.firstStepRegistrationInfo)
    this.msg$ = this._store.select(state => state.user.viewMsg)
  }

  ngOnInit(): void {
  }

  firstRegisterInfo() {
    const { userName, idNumber, password, confirmPassword } = this.firstStepRegistrationForm.value;
    userName.trim();
    idNumber.trim();
    password.trim();
    confirmPassword.trim();

    if (password === confirmPassword) {
      const firstStepRegistrationInfo: FirstStepUser = { userName, idNumber, password };
      this._store.dispatch(firstStepRegistrationRequest({ firstStepRegistrationInfo }));
      this.openSnackBar()
    } else {
      this._snackBar.open('Password Confirmation Failed', '', {
        duration: 2000
      });
    }
    this.openSnackBar()
  };

  secondRegisterInfo() {
    const { name, lastName, city, street } = this.secondStepRegistrationForm.value;
    name.trim();
    lastName.trim();
    city.trim();
    street.trim();


    this.firstRegistrationInfo$.subscribe(value => {
      const { idNumber, password, userName } = value
      const secondStepRegistrationInfo: User = { name, lastName, city, street, idNumber, password, userName, role: 'user' };
      this._store.dispatch(secondStepRegistrationRequest({ secondStepRegistrationInfo }));
      this.firstStepRegistrationForm.reset();
      this.openSnackBar()
    })
    this.registerRouting.homePage();
  };

  openSnackBar() {
    this.msg$.subscribe(value => {
      this._snackBar.open(value, '', {
        duration: 2000
      });
    })
  }

  registerRouting = {
    homePage: () => this.router.navigateByUrl('/homepage'),
  }

}
