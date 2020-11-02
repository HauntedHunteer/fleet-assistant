import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserData } from '../../_models/user-data';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createUserData(userData: UserData): Observable<UserData> {
    return this.httpClient.post<UserData>(`${environment.apiUrl}/user/userdata`, userData, httpOptions);
  }

  getUserData(userId): Observable<UserData> {
    return this.httpClient.get<UserData>(`${environment.apiUrl}/user/userdata/` + userId, httpOptions);
  }

  updateUserData(userData: UserData): Observable<UserData> {
    return this.httpClient.put<UserData>(`${environment.apiUrl}/user/userdata`, userData, httpOptions);
  }
}
