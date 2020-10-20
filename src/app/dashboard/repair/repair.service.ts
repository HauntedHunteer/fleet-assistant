import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Repair } from '../../_models/repair';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getRepairList(): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  getRepairListById(repairId): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  createRepair(repair: Repair): Observable<Repair> {
    return this.httpClient.post<Repair>(`${environment.apiUrl}/vehicle`, repair, httpOptions);
    // broken
  }

  getRepairDetails(repairId): Observable<Repair> {
    return this.httpClient.get<Repair>(`${environment.apiUrl}/vehicle/v?id=` + repairId, httpOptions);
    // broken
  }

  updateRepair(repair: Repair): Observable<Repair> {
    return this.httpClient.put<Repair>(`${environment.apiUrl}/vehicle`, repair, httpOptions);
    // broken
  }

  // missing delete
}
