import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addProduct(token, product: Product): Observable<any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'product', params, {headers: headers});
  }

  editProduct(token, id, product: Product): Observable<any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-product/'+id, params, {headers: headers});
  }

  deactivateProduct(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-product/'+id, params, {headers: headers});
  }

  activateProduct(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-product/'+id, params, {headers: headers});
  }

  getProduct(id): Observable<any>{
    return this._http.get(this.url+'product/'+id);
  }

  getProducts(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'products?pag='+pag, {headers: headers});
  }

  getProductsA(token): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'productsa', {headers: headers});
  }

  getProductsServicesA(token): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'productsservicea', {headers: headers});
  }

  getProductCount(): Observable<any>{
    return this._http.get(this.url+'products-count');
  }
}
