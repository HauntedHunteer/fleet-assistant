import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Use } from '../../_models/use';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UseService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSharedUseList(vehicleId, userId): Observable<Use[]> {
    let params = new HttpParams();
    params = params.append('v', vehicleId);
    params = params.append('u', userId);
    return this.httpClient.get<Use[]>(`${environment.apiUrl}/use/list`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getUseListById(vehicleId): Observable<Use[]> {
    return this.httpClient.get<Use[]>(`${environment.apiUrl}/use/v/` + vehicleId, httpOptions);
  }

  createUse(use: Use): Observable<Use> {
    return this.httpClient.post<Use>(`${environment.apiUrl}/use`, use, httpOptions);
  }

  getUseDetails(useId): Observable<Use> {
    return this.httpClient.get<Use>(`${environment.apiUrl}/use/` + useId, httpOptions);
  }

  updateUse(use: Use): Observable<Use> {
    return this.httpClient.put<Use>(`${environment.apiUrl}/use`, use, httpOptions);
  }

  deleteUse(useId): Observable<Use> {
    return this.httpClient.delete<Use>(`${environment.apiUrl}/use/` + useId, httpOptions);
  }
}
