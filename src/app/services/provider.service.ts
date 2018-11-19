import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Provider } from '../models/provider';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addProvider(token, provider: Provider): Observable<any>{
    let params = JSON.stringify(provider);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'provider', params, {headers: headers});
  }

  editProvider(token, id, provider: Provider): Observable<any>{
    let params = JSON.stringify(provider);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-provider/'+id, params, {headers: headers});
  }

  deactivateProvider(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-provider/'+id, params, {headers: headers});
  }

  activateProvider(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-provider/'+id, params, {headers: headers});
  }

  getProvider(id): Observable<any>{
    return this._http.get(this.url+'provider/'+id);
  }

  getProviders(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'providers?pag='+pag, {headers: headers});
  }

  getProvidersA(token): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'providersa',{headers: headers});
  }

  getProviderCount(): Observable<any>{
    return this._http.get(this.url+'providers-count');
  }
}
