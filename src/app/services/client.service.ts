import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Client } from '../models/client';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addClient(token, client: Client): Observable<any>{
    let params = JSON.stringify(client);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'client', params, {headers: headers});
  }

  editClient(token, id, client: Client): Observable<any>{
    let params = JSON.stringify(client);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-client/'+id, params, {headers: headers});
  }

  deactivateClient(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-client/'+id, params, {headers: headers});
  }

  activateClient(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-client/'+id, params, {headers: headers});
  }

  getClient(id): Observable<any>{
    return this._http.get(this.url+'client/'+id);
  }

  getClients(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'clients?pag='+pag, {headers: headers});
  }

  getClientsA(token): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'clientsa',{headers: headers});
  }

  getClientCount(): Observable<any>{
    return this._http.get(this.url+'clients-count');
  }
}
