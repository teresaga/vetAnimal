import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Consultation } from '../models/consultation';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  addConsultation(token, consultation: Consultation): Observable<any>{
    let params = JSON.stringify(consultation);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);

    return this._http.post(this.url+'consultation', params, {headers: headers});
  }

  getConsultations(token, pag: number = 0): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'consultations?pag='+pag, {headers: headers});
  }

  getHistoryOfAnimal(token, id, pag: number = 0, datestart, dateend ): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url+'history-animal/'+id+'?pag='+pag+'&datestart='+datestart+'&dateend='+dateend,{headers: headers});
  }

  getConsultation(id): Observable<any>{
    return this._http.get(this.url+'consultation/'+id);
  }
}
