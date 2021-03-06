import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Job } from '../models/job';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addJob(token, job: Job): Observable<any>{
    let params = JSON.stringify(job);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'job', params, {headers: headers});
  }

  editJob(token, id, job: Job): Observable<any>{
    let params = JSON.stringify(job);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-job/'+id, params, {headers: headers});
  }

  deactivateJob(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-job/'+id, params, {headers: headers});
  }

  activateJob(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-job/'+id, params, {headers: headers});
  }

  getJobs(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'jobs?pag='+pag);
  }

  getJobsA(): Observable<any>{
    return this._http.get(this.url+'jobsa');
  }
}
