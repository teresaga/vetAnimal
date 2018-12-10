import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Corte } from '../models/corte';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CorteService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addCorte(token, corte: Corte): Observable<any>{
    let params = JSON.stringify(corte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'corte', params, {headers: headers});
  }

  editCorte(token, id, corte: Corte): Observable<any>{
    let params = JSON.stringify(corte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-corte/'+id, params, {headers: headers});
  }

  getCortes(token, pag: number = 0, datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'cortes?pag='+pag+'&datestart='+datestart+'&dateend='+dateend,{headers: headers});
  }

  getUltimoCorte(token ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'ultimo-corte',{headers: headers});
  }

}
