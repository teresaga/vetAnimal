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

  addWorker(token, worker: Worker): Observable<any>{
    let params = JSON.stringify(worker);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'worker', params, {headers: headers});
  }

  editWorker(token, id, worker: Worker): Observable<any>{
    let params = JSON.stringify(worker);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-worker/'+id, params, {headers: headers});
  }

  deactivateWorker(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-worker/'+id, params, {headers: headers});
  }

  activateWorker(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-worker/'+id, params, {headers: headers});
  }

  getWorker(id): Observable<any>{
    return this._http.get(this.url+'worker/'+id);
  }

  getWokers(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'workers?pag='+pag, {headers: headers});
  }

  getWorkerCount(): Observable<any>{
    return this._http.get(this.url+'workers-count');
  }
}
