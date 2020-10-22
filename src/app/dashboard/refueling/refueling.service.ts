import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getRefuelingList(): Observable<Refueling[]> {
    return this.httpClient.get<Refueling[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
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

  // missing delete
}
