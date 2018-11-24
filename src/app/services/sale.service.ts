import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Sale } from '../models/sale';
import { Saledetails } from '../models/saledetails';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addSale(token, sale: Sale): Observable<any>{
    let params = JSON.stringify(sale);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'sale', params, {headers: headers});
  }

  addSaleDetails(token, saledetails: Saledetails): Observable<any>{
    let params = JSON.stringify(saledetails);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'saledetails', params, {headers: headers});
  }
  
  getSale(token, pag: number = 0, datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'sale?pag='+pag+'&datestart='+datestart+'&dateend='+dateend,{headers: headers});
  }

  getSaleDetails(token, id ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'saledetails/'+id,{headers: headers});
  }
}
