import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // auxiliary methods
  makeParamsForFleetAndUser(qParams): HttpParams {
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    return params;
  }

  makeParamsForVehicle(qParams): HttpParams {
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    params = params.append('v', qParams.vehicleId);
    return params;
  }

  makeParamsForDriver(qParams): HttpParams {
    let params = new HttpParams();
    params = params.append('b', qParams.startDate);
    params = params.append('e', qParams.endDate);
    params = params.append('u', qParams.userId);
    return params;
  }

  // fleet-statistics.component
  getFuelCostsForFleet(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForFleetAndUser(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/fuel_cost_by_vehicle`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getMileageForFleet(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForFleetAndUser(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/use_cost_by_vehicle`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getVehicleCostsForFleet(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForFleetAndUser(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/cost_by_category`, {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getVehicleUseCountForFleet(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForFleetAndUser(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/use_number_by_vehicle` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  // vehicle-statistics.component
  getFuelCostsForVehicle(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForVehicle(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/cost_fuel_by_vehicle` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
  getMileageForVehicle(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForVehicle(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/trip_by_vehicle` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getVehicleCosts(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForVehicle(qParams);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/vehicle_cost_by_category` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});

  }

  getMileageGrouped(qParams): Observable<StatsElement[]>{
    const params = this.makeParamsForVehicle(qParams);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/vehicle_trip_by_trip_type` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  // driver-statistics.component
  getMileageForDriver(qParams): Observable<StatsElement[]> {
      const params = this.makeParamsForDriver(qParams);
    // tslint:disable-next-line:max-line-length
      return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/trip_by_user` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getFuelCostsForDriver(qParams): Observable<StatsElement[]> {
    const params = this.makeParamsForDriver(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/fuel_cost_by_user` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  // user-statistics.component
  getMileageForUser(qParams): Observable<StatsElement[]> {
    const params = this.makeParamsForFleetAndUser(qParams);
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/trip_by_login_user` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getFuelCostsForUser(qParams): Observable<StatsElement[]> {
    const params = this.makeParamsForFleetAndUser(qParams);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<StatsElement[]>(`${environment.apiUrl}/dashboard/fuel_cost_by_login_user` , {params, headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
