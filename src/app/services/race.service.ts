import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Race } from '../models/race';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addRace(token, race: Race): Observable<any>{
    let params = JSON.stringify(race);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'race', params, {headers: headers});
  }

  editRace(token, id, race: Race): Observable<any>{
    let params = JSON.stringify(race);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-race/'+id, params, {headers: headers});
  }

  deactivateRace(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-race/'+id, params, {headers: headers});
  }

  activateRace(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-race/'+id, params, {headers: headers});
  }

  getRaces(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'races?pag='+pag);
  }

  getRacesASpecie(id): Observable<any>{
    return this._http.get(this.url+'racesa-specie/'+id);
  }
}
