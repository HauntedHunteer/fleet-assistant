import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Inspection } from '../../_models/inspection';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getInspectionList(): Observable<Inspection[]> {
    return this.httpClient.get<Inspection[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  getInspectionListById(vehicleId): Observable<Inspection[]> {
    return this.httpClient.get<Inspection[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  createInspection(inspection: Inspection): Observable<Inspection> {
    return this.httpClient.post<Inspection>(`${environment.apiUrl}/vehicle`, inspection, httpOptions);
    // broken
  }

  getInspectionDetails(inspectionId): Observable<Inspection> {
    return this.httpClient.get<Inspection>(`${environment.apiUrl}/vehicle/v?id=` + inspectionId, httpOptions);
    // broken
  }

  updateInspection(inspection: Inspection): Observable<Inspection> {
    return this.httpClient.put<Inspection>(`${environment.apiUrl}/vehicle`, inspection, httpOptions);
    // broken
  }

  // missing delete
}
