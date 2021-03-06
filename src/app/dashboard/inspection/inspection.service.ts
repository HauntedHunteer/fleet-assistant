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

  getInspectionListById(vehicleId): Observable<Inspection[]> {
    return this.httpClient.get<Inspection[]>(`${environment.apiUrl}/inspection/v/` + vehicleId, httpOptions);
  }

  createInspection(inspection: Inspection): Observable<Inspection> {
    return this.httpClient.post<Inspection>(`${environment.apiUrl}/inspection`, inspection, httpOptions);
  }

  getInspectionDetails(inspectionId): Observable<Inspection> {
    return this.httpClient.get<Inspection>(`${environment.apiUrl}/inspection/` + inspectionId, httpOptions);
  }

  updateInspection(inspection: Inspection): Observable<Inspection> {
    return this.httpClient.put<Inspection>(`${environment.apiUrl}/inspection`, inspection, httpOptions);
  }

  deleteInspection(inspectionId): Observable<Inspection> {
    return this.httpClient.delete<Inspection>(`${environment.apiUrl}/inspection/` + inspectionId, httpOptions);
  }
}

