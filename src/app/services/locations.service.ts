import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICountry, IState } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  url = environment.locations.baseUrl;

  constructor( private http: HttpClient) { }

  getStates() {
    return this.http.get<IState[]>(this.url + '/estados');
  }

  getCountry() {
    return this.http.get<ICountry[]>(this.url + '/paises/76');
  }
  
}
