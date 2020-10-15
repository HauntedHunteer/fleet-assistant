import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserAddressAndData } from '../../_models/user-address-and-data';


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

  createUserData(userAddressAndData: UserAddressAndData): Observable<UserAddressAndData> {
    return this.httpClient.post<UserAddressAndData>(`${environment.apiUrl}/user/userdata`, userAddressAndData, httpOptions);
  }

  viewUserData(): Observable<UserAddressAndData> {
    return this.httpClient.get<UserAddressAndData>(`${environment.apiUrl}/user/userdata`, httpOptions);
  }

  updateUserData(userAddressAndData: UserAddressAndData): Observable<UserAddressAndData> {
    return this.httpClient.put<UserAddressAndData>(`${environment.apiUrl}/user/userdata`, userAddressAndData, httpOptions);
  }
}
