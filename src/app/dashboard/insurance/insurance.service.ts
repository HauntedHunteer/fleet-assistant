import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Insurance } from '../../_models/insurance';
import { InsuranceType } from '../../_models/insurance-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getInsuranceList(): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  getInsuranceListById(vehicleId): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(`${environment.apiUrl}/vehicle`, httpOptions);
    // broken
  }

  createInsurance(insurance: Insurance): Observable<Insurance> {
    return this.httpClient.post<Insurance>(`${environment.apiUrl}/vehicle`, insurance, httpOptions);
    // broken
  }

  getInsuranceDetails(insuranceId): Observable<Insurance> {
    return this.httpClient.get<Insurance>(`${environment.apiUrl}/vehicle/v?id=` + insuranceId, httpOptions);
    // broken
  }

  updateInsurance(insurance: Insurance): Observable<Insurance> {
    return this.httpClient.put<Insurance>(`${environment.apiUrl}/vehicle`, insurance, httpOptions);
    // broken
  }

  // missing delete

  getInsuranceTypes(): Observable<InsuranceType[]> {
    return this.httpClient.get<InsuranceType[]>(`${environment.apiUrl}/vehicle/fuelType`, httpOptions);
    // broken
  }
}
