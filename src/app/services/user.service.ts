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

  register(user_to_register: User, token): Observable<any>{
    let params = JSON.stringify(user_to_register);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'register', params, {headers: headers});
  }

  editUserPassword(token, id, user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-user-password/'+id, params, {headers: headers});
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

  editUser(token, id, user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'update-user/'+id, params, {headers: headers});
  }

  deactivateUser(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'deactivate-user/'+id, params, {headers: headers});
  }

  activateUser(token, id): Observable<any>{
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.put(this.url+'activate-user/'+id, params, {headers: headers});
  }

  getUser(id): Observable<any>{
    return this._http.get(this.url+'user/'+id);
  }

  getUsers(token, id,  pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'users/'+id+'?pag='+pag, {headers: headers});
  }

  getUserCount(): Observable<any>{
    return this._http.get(this.url+'users-count');
  }
}
