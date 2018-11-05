import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Worker } from '../models/worker';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  getWrokers(): Observable<any>{
    return this._http.get(this.url+'workers');
  }
}
