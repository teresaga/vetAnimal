import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Animal } from '../models/animal';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  getAnimal(id): Observable<any>{
    return this._http.get(this.url+'animal/'+id);
  }

  getAnimalsClient(token, id, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'animals-client/'+id+'?pag='+pag,{headers: headers});
  }

  getAnimalCount(): Observable<any>{
    return this._http.get(this.url+'animals-count');
  }
}
