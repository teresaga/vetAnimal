import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addActivity(token, activity: Activity): Observable<any>{
    let params = JSON.stringify(activity);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'activity', params, {headers: headers});
  }

  editActivity(token, id, activity: Activity): Observable<any>{
    let params = JSON.stringify(activity);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-activity/'+id, params, {headers: headers});
  }
  cancelActivity(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'cancel-activity/'+id, params, {headers: headers});
  }

  finishActivity(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'finish-activity/'+id, params, {headers: headers});
  }

  startActivity(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'start-activity/'+id, params, {headers: headers});
  }

  getActivity(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this._http.get(this.url+'animal/'+id, {headers: headers});
  }

  getActivities(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities?pag='+pag, {headers: headers});
  }

  getActivities_animalStatusDate(token, pag: number = 0, animal, status ,datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-animal-status-date/'+animal+'?pag='+pag+'&datestart='+datestart+'&dateend='+dateend+'&status='+status,{headers: headers});
  }

  getActivities_animalDate(token, pag: number = 0, animal ,datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-animal-date/'+animal+'?pag='+pag+'&datestart='+datestart+'&dateend='+dateend,{headers: headers});
  }

  getActivities_statusDate(token, pag: number = 0, status ,datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-status-date?pag='+pag+'&datestart='+datestart+'&dateend='+dateend+'&status='+status,{headers: headers});
  }

  getActivities_date(token, pag: number = 0, datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-date?pag='+pag+'&datestart='+datestart+'&dateend='+dateend,{headers: headers});
  }

  getActivities_dateWorker(token, pag: number = 0, datestart, dateend, worker ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-date-worker?pag='+pag+'&datestart='+datestart+'&dateend='+dateend+'&worker='+worker,{headers: headers});
  }

  getActivities_animalDateWorker(token, pag: number = 0, animal ,datestart, dateend, worker ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'activities-animal-date-worker/'+animal+'?pag='+pag+'&datestart='+datestart+'&dateend='+dateend+'&worker='+worker,{headers: headers});
  }
}
