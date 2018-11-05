import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  signup(user_to_login, gettoken = null): Observable<any>{
    if(gettoken != null){
      user_to_login.gettoken = gettoken;
    }
    let params = JSON.stringify(user_to_login);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }
}
