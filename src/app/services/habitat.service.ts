import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Habitat } from '../models/habitat';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addHabitat(token, habitat: Habitat): Observable<any>{
    let params = JSON.stringify(habitat);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'habitat', params, {headers: headers});
  }

  editHabitat(token, id, habitat: Habitat): Observable<any>{
    let params = JSON.stringify(habitat);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-habitat/'+id, params, {headers: headers});
  }

  deactivateHabitat(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-habitat/'+id, params, {headers: headers});
  }

  activateHabitat(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-habitat/'+id, params, {headers: headers});
  }

  getHabitats(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'habitats?pag='+pag);
  }

  getHabitatsA(): Observable<any>{
    return this._http.get(this.url+'habitatsa');
  }
}
