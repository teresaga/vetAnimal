import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Character } from '../models/character';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addCharacter(token, character: Character): Observable<any>{
    let params = JSON.stringify(character);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'character', params, {headers: headers});
  }

  editCharacter(token, id, character: Character): Observable<any>{
    let params = JSON.stringify(character);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-character/'+id, params, {headers: headers});
  }

  deactivateCharacter(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-character/'+id, params, {headers: headers});
  }

  activateCharacter(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-character/'+id, params, {headers: headers});
  }

  getCharacters(pag: number = 0): Observable<any>{
    return this._http.get(this.url+'characters?pag='+pag);
  }

  getCharactersA(): Observable<any>{
    return this._http.get(this.url+'charactersa');
  }
}
