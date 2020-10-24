import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getUseList(): Observable<Use[]> {
    return this.httpClient.get<Use[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  getUseListById(vehicleId): Observable<Use[]> {
    return this.httpClient.get<Use[]>(`${environment.apiUrl}/inspection/v/` + vehicleId, httpOptions);
    // broken
  }

  createUse(use: Use): Observable<Use> {
    return this.httpClient.post<Use>(`${environment.apiUrl}/inspection`, use, httpOptions);
    // broken
  }

  getUseDetails(useId): Observable<Use> {
    return this.httpClient.get<Use>(`${environment.apiUrl}/inspection/` + useId, httpOptions);
    // broken
  }

  updateUse(use: Use): Observable<Use> {
    return this.httpClient.put<Use>(`${environment.apiUrl}/inspection`, use, httpOptions);
    // broken
  }

  // missing delete
}
