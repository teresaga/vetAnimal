import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Typeproduct } from '../models/typeproduct';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class TypeproductService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addTypeproduct(token, typeproduct: Typeproduct): Observable<any>{
    let params = JSON.stringify(typeproduct);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'typeproduct', params, {headers: headers});
  }

  getTypeproducts(): Observable<any>{
    return this._http.get(this.url+'typeproducts');
  }

  getTypeproductsA(): Observable<any>{
    return this._http.get(this.url+'typeproductsa');
  }
}
