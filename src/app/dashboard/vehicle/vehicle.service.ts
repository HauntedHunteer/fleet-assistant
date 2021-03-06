import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Vehicle } from '../../_models/vehicle';
import { VehicleMake } from '../../_models/vehicle-make';
import { FuelType } from '../../_models/fuel-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getVehicleList(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${environment.apiUrl}/vehicle`, httpOptions);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(`${environment.apiUrl}/vehicle`, vehicle, httpOptions);
  }

  getVehicleDetails(vehicleId): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(`${environment.apiUrl}/vehicle/` + vehicleId, httpOptions);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(`${environment.apiUrl}/vehicle`, vehicle, httpOptions);
  }

  deleteVehicle(vehicleId): Observable<Vehicle> {
    return this.httpClient.delete<Vehicle>(`${environment.apiUrl}/vehicle/` + vehicleId, httpOptions);
  }

  getMakes(): Observable<VehicleMake[]> {
    return this.httpClient.get<VehicleMake[]>(`${environment.apiUrl}/vehicle/make`, httpOptions);
  }

  getFuelTypes(): Observable<FuelType[]> {
    return this.httpClient.get<FuelType[]>(`${environment.apiUrl}/vehicle/fuelType`, httpOptions);
  }

  getVehicleListToShare(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${environment.apiUrl}/share/vehicles`, httpOptions);
  }

  getSharedVehicleList(driverId): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${environment.apiUrl}/share/user/` + driverId, httpOptions);
  }
}
