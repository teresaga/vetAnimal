import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private _router: Router, private _userService: UserService){

  }
  canActivate(){
      if (this._userService.estaLogueado()){
        console.log('PASO EL GUARD');
        return true;
      }else{
        console.log('Bloqueado por el guard');
        this._router.navigate(['/login']);
        return false;
      }
  }
}
