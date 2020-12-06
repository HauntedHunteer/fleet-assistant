import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { TokenStorageService } from './token-storage.service';
import { ResetPwd } from '../_models/reset-pwd';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService) { }

  login(credentials): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/auth/signin`, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/auth/signup`, {
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/account/login']);
  }

  resetPassword(email): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/reset-password`, email, httpOptions);
  }

  getResetPasswordToken(qParams): Observable<any> {
    let params = new HttpParams();
    params = params.append('u', qParams.u);
    params = params.append('c', qParams.c);
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/user/reset-password`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  setNewPassword(bundle: ResetPwd): Observable<ResetPwd> {
    return this.http.post<ResetPwd>(`${environment.apiUrl}/user/reset-password/new`, bundle, httpOptions);
  }

  changePassword(oldPassword, newPassword): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/change-password`, {
      oldPassword,
      newPassword
    }, httpOptions);
  }

  getMail(userId): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/get-user-by-id/` + userId, httpOptions);
  }
}
