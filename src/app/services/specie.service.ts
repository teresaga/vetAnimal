import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Specie } from '../models/specie';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addSpecie(token, specie: Specie): Observable<any>{
    let params = JSON.stringify(specie);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'specie', params, {headers: headers});
  }

  editSpecie(token, id, specie: Specie): Observable<any>{
    let params = JSON.stringify(specie);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-specie/'+id, params, {headers: headers});
  }

  deactivateSpecie(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-specie/'+id, params, {headers: headers});
  }

  activateSpecie(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-specie/'+id, params, {headers: headers});
  }

  getSpecies(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'species?pag='+pag);
  }

  getSpeciesA(): Observable<any>{
    return this._http.get(this.url+'speciesa');
  }
}
