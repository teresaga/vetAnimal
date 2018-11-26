import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public title: string;
  public identity;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _userService: UserService
  ) { 
    this.user = new User('','','','','','','','');
  }

  ngOnInit() {
  }

  onSubmit() {
    //Loguear al usuario y conseguir el objeto
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        if(!this.identity || !this.identity._id){
          alert("El usuario no se ha logueado correctamente");
        }else{
          this.identity.password = '';
          localStorage.setItem('identity', JSON.stringify(this.identity));
          
          //Conseguir el token
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;
      
              if(this.token.length <= 0){
                alert("El token no se ha generado");
              }else{
                localStorage.setItem('token', this.token);
                this.status = 'success';

                this._router.navigate(['/home']);
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      },
      error => {
        var errorMessage =<any>error;

        if(errorMessage != null) {
          //var body = JSON.parse(error._body);
          this.status = 'error';
        }
      }
    );
  }

}
