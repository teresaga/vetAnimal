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

  editMeasurementunit(token, id, unit: Measurementunit): Observable<any>{
    let params = JSON.stringify(unit);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-unit/'+id, params, {headers: headers});
  }

  deactivateMeasurementunit(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-unit/'+id, params, {headers: headers});
  }

  activateMeasurementunit(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-unit/'+id, params, {headers: headers});
  }

  getMeasurementunits(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'units?pag='+pag);
  }

  getMeasurementunitsA(): Observable<any>{
    return this._http.get(this.url+'unitsa');
  }
}
