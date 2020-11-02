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
    // todo
  }

  getRepairListById(vehicleId): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(`${environment.apiUrl}/repair/v/` + vehicleId, httpOptions);
  }

  createRepair(repair: Repair): Observable<Repair> {
    return this.httpClient.post<Repair>(`${environment.apiUrl}/repair`, repair, httpOptions);
  }

  getRepairDetails(repairId): Observable<Repair> {
    return this.httpClient.get<Repair>(`${environment.apiUrl}/repair/` + repairId, httpOptions);
  }

  updateRepair(repair: Repair): Observable<Repair> {
    return this.httpClient.put<Repair>(`${environment.apiUrl}/repair`, repair, httpOptions);
  }

  deleteRepair(repairId): Observable<Repair> {
    return this.httpClient.delete<Repair>(`${environment.apiUrl}/repair/` + repairId, httpOptions);
  }
}
