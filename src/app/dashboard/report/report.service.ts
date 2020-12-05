import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) { }
  // todo assign proper endpoints
  generateVehicleReport(qParams): Observable<any> {
    let params = new HttpParams();
    params = params.append('r', qParams.reportSubject);
    params = params.append('v', qParams.vehicleId);
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get(`${environment.apiUrl}/reports/something`, {params, responseType: 'blob'});
  }

  generateUserReport(qParams): Observable<any> {
    let params = new HttpParams();
    params = params.append('r', qParams.reportSubject);
    params = params.append('u', qParams.userId);
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get(`${environment.apiUrl}/reports/something`, {params, responseType: 'blob'});
  }
}
