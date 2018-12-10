import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url: string;
  public identity;
  public token;

  constructor() { 
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    return new Promise(function(resolve, reject){
      var fromData: any = new FormData();
      var xhr = new XMLHttpRequest();
      fromData.append(name, files[0], files[0].name);
      /*
      for(var i = 0; i < files.length; i++){
        fromData.append(name, files[i], files[i].name);
      }*/

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(fromData);
    });
  }
}
