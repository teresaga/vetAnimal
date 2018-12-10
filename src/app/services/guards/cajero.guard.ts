import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'

@Injectable({
  providedIn: 'root'
})
export class CajeroGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let identity =  this._userService.getIdentity();
    
    if(identity && (identity.role == "CAJERO" || identity.role == "ADMIN")){
      return true;
    }else{
      this._userService.logout();
      return false;
    }
  }
}
