import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Refueling } from '../../_models/refueling';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RefuelingService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSharedRefuelingList(vehicleId, userId): Observable<Refueling[]> {
    let params = new HttpParams();
    params = params.append('v', vehicleId);
    params = params.append('u', userId);
    return this.httpClient.get<Refueling[]>(`${environment.apiUrl}/refueling/list`, {params: params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getRefuelingListById(vehicleId): Observable<Refueling[]> {
    return this.httpClient.get<Refueling[]>(`${environment.apiUrl}/refueling/v/` + vehicleId, httpOptions);
  }

  createRefueling(refueling: Refueling): Observable<Refueling> {
    return this.httpClient.post<Refueling>(`${environment.apiUrl}/refueling`, refueling, httpOptions);
  }

  getRefuelingDetails(refuelingId): Observable<Refueling> {
    return this.httpClient.get<Refueling>(`${environment.apiUrl}/refueling/` + refuelingId, httpOptions);
  }

  updateRefueling(refueling: Refueling): Observable<Refueling> {
    return this.httpClient.put<Refueling>(`${environment.apiUrl}/refueling`, refueling, httpOptions);
  }

  deleteRefueling(refuelingId): Observable<Refueling> {
    return this.httpClient.delete<Refueling>(`${environment.apiUrl}/refueling/` + refuelingId, httpOptions);
  }
}
