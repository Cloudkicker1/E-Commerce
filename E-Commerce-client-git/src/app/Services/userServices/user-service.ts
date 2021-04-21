import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../Models/userModels/login.model';
import { FirstStepUser, User } from 'src/app/models/userModels/user.model';

const mainUrlPath = "http://localhost:4000/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/login`, loginInfo);
  }

  firstRegister(firstStepRegistrationInfo: FirstStepUser): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/firstregister`, firstStepRegistrationInfo);
  }

  secondRegister(secondStepRegistrationInfo: User): Observable<any> {
    return this.httpclient.post(`${mainUrlPath}/secondregister`, secondStepRegistrationInfo);
  }

  userInfo(): Observable<any> {
    return this.httpclient.get(`${mainUrlPath}/userinfo`);
  }
}
