import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NewDriversAccount } from '../../_models/new-drivers-account';
import { User } from '../../_models/user';
import { Share } from '../../_models/share';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    private http: HttpClient
  ) { }

  generateNewAccount(email): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/new-account`, email, httpOptions);
  }

  getNewAccountPasswordToken(qParams): Observable<any> {
    let params = new HttpParams();
    params = params.append('u', qParams.u);
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/user/new-account`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  setNewPasswordForUser(bundle: NewDriversAccount): Observable<NewDriversAccount> {
    return this.http.post<NewDriversAccount>(`${environment.apiUrl}/user/new-account/password`, bundle, httpOptions);
  }

  getDriversList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user/show-all-account`, httpOptions);
  }

  createShareVehicle(share: Share): Observable<Share> {
    return this.http.post<Share>(`${environment.apiUrl}/share`, share, httpOptions);
  }

  deleteShareVehicle(vehicleId): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/share/vehicle/` + vehicleId, httpOptions);
  }
}
