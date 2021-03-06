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

  getInsuranceListById(vehicleId): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(`${environment.apiUrl}/insurance/v/` + vehicleId, httpOptions);
  }

  createInsurance(insurance: Insurance): Observable<Insurance> {
    return this.httpClient.post<Insurance>(`${environment.apiUrl}/insurance`, insurance, httpOptions);
  }

  getInsuranceDetails(insuranceId): Observable<Insurance> {
    return this.httpClient.get<Insurance>(`${environment.apiUrl}/insurance/` + insuranceId, httpOptions);
  }

  updateInsurance(insurance: Insurance): Observable<Insurance> {
    return this.httpClient.put<Insurance>(`${environment.apiUrl}/insurance`, insurance, httpOptions);
  }

  deleteInsurance(insuranceId): Observable<Insurance> {
    return this.httpClient.delete<Insurance>(`${environment.apiUrl}/insurance/` + insuranceId, httpOptions);
  }

  getInsuranceTypes(): Observable<InsuranceType[]> {
    return this.httpClient.get<InsuranceType[]>(`${environment.apiUrl}/insurance/types`, httpOptions);
  }
}
