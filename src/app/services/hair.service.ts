import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Hair } from '../models/hair';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HairService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addHair(token, hair: Hair): Observable<any>{
    let params = JSON.stringify(hair);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'hair', params, {headers: headers});
  }

  editHair(token, id, hair: Hair): Observable<any>{
    let params = JSON.stringify(hair);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-hair/'+id, params, {headers: headers});
  }

  deactivateHair(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-hair/'+id, params, {headers: headers});
  }

  activateHair(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-hair/'+id, params, {headers: headers});
  }

  getHairs(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'hairs?pag='+pag);
  }

  getHairsA(): Observable<any>{
    return this._http.get(this.url+'hairsa');
  }
}
