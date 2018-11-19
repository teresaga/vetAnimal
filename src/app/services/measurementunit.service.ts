import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Measurementunit } from '../models/measurementunit';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class MeasurementunitService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addMeasurementunit(token, measurementunit: Measurementunit): Observable<any>{
    let params = JSON.stringify(measurementunit);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'unit', params, {headers: headers});
  }

  getMeasurementunits(): Observable<any>{
    return this._http.get(this.url+'units');
  }

  getMeasurementunitsA(): Observable<any>{
    return this._http.get(this.url+'unitsa');
  }
}
