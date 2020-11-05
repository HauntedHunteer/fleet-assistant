import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/admin`, httpOptions);
  }

  getUserDetails(userId): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/admin/user/` + userId, httpOptions);
  }

  changeUserStatus(userId, userStatus): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/admin/status`, {
      id: userId,
      userStatus: userStatus
    }, httpOptions);
  }
}
