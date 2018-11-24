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
  
  addAnimal(token, animal: Animal): Observable<any>{
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'animal', params, {headers: headers});
  }

  editAnimal(token, id, animal: Animal): Observable<any>{
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-animal/'+id, params, {headers: headers});
  }

  deactivateAnimal(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-animal/'+id, params, {headers: headers});
  }

  activateAnimal(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-animal/'+id, params, {headers: headers});
  }

  getAnimal(id): Observable<any>{
    return this._http.get(this.url+'animal/'+id);
  }

  getAnimalsClient(token, id, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'animals-client/'+id+'?pag='+pag,{headers: headers});
  }

  getAnimalsAClient(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'animalsa-client/'+id,{headers: headers});
  }

  getAnimalsSelect(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'animals-select/'+id,{headers: headers});
  }

  getAnimalCount(): Observable<any>{
    return this._http.get(this.url+'animals-count');
  }
}
