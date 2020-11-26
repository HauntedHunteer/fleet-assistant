import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { StatsElement } from '../../_models/stats-element';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private httpClient: HttpClient
  ) { }
// todo fix endpoints
  // fleet-statistics.component
  getFuelConsumptionCostsForFleet(qParams): Observable<StatsElement[]>{
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/fuel_cost_by_vehicle`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getMileageForFleet(qParams): Observable<StatsElement[]>{
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/use_cost_by_vehicle`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getVehicleCostsForFleet(qParams): Observable<StatsElement[]>{
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/cost_by_category`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getMonthlyVehicleCostsForFleet(qParams): Observable<StatsElement[]>{
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/something` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
  /*
  // vehicle-statistics.component
  getFuelConsumptionCosts(statsTerm: StatsTerm): Observable<StatsElement[]>{
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/something` + statsTerm, httpOptions);
  }
  getMileage(statsTerm: StatsTerm): Observable<StatsElement[]>{
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/something` + statsTerm, httpOptions);
  }

  getVehicleCosts(statsTerm: StatsTerm): Observable<StatsElement[]>{
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/something` + statsTerm, httpOptions);
  }

  getMonthlyVehicleCosts(statsTerm: StatsTerm): Observable<StatsElement[]>{
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/something` + statsTerm, httpOptions);
  }
  */
  // driver-statistics.component
}
