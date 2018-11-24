import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

import { User } from '../../models/user';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingForm: FormGroup;
  public status: string;
  public user: User;
  //token
  public url: string;
  public token;
  public identity;
  //Mensaje de estado
  public message: string;

  constructor(
    private pf: FormBuilder,
    private _userService: UserService
  ) { 
    this.user = new User('','','','','','','','');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.status = "";
    this.message = "";
  }

  ngOnInit() {
    this.settingForm = this.pf.group({
      password_new: ['', Validators.required],
      password_check: ['', Validators.required]
    });
  }

  ////////////////////////////////////////////////////////////
  //                   CAMBIAR CONTRASEÑA                   //
  ////////////////////////////////////////////////////////////
  onSubmit(){
    this.user._id=this.identity._id;
    this.user.password = this.settingForm.get('password_new').value;
    var password_check =  this.settingForm.get('password_check').value;
    
    if(this.user.password!=password_check){
      this.message="No coincide la contraseña con la verificación.";
      this.status = 'error';
    }else{
      this._userService.editUserPassword(this.token, this.identity._id, this.user).subscribe(
        response => {
          if(response.user){
            this.status = 'success';
            this.message="Cambios guardados exitosamente.";
            this.user = response.user;
          }else{
            this.status = 'error';
            this.message = response.message;
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }
}
