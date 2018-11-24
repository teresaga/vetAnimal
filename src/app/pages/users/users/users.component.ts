import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';
import { GLOBAL } from '../../../services/global';

import { User } from '../../../models/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //Para form y registrar usuario
  userForm: FormGroup;
  userEditForm: FormGroup;
  public user: User;
  public status: string;
  public status2: string;

  //token
  public url: string;
  public token;
  public identity;

  //Arreglos para selects
  public workers: Worker[];

  //Variables para mostrar productos y realizar paginacion
  public users: User[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  //Mensaje de estado
  public message: string;
  public message2: string;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _workerService: WorkerService,
    private _userService: UserService
  ) { 
    this.user = new User('','','','','','','','');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.status = "";
    this.status2 = "";
    this.message = "";
    this.message2 = "";
  }

  ngOnInit() {
    this.getUsers();
    this.getWorkersA();
    this.userForm = this.pf.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_check: ['', Validators.required],
      worker: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.userEditForm = this.pf.group({
      worker: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.userForm.reset();
      }
    });
    this.userForm.reset();
  }

  openModaledit(content, user: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.userEditForm.reset();
      }
    });
    this.user._id = user._id;
    this.userEditForm.get('worker').setValue(user.worker._id);
    this.userEditForm.get('role').setValue(user.role);
  }

  openModalStatus(content, user: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateUser(user);
      }
      if(result=='Activate'){
        this.activateUser(user);
      }
    }, (reason) => {
    });
    this.user.username = user.username;
  }

  ////////////////////////////////////////////////////////////
  //                   AGREGAR USUARIO                      //
  ////////////////////////////////////////////////////////////
  onSubmitAddUser(){
    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;
    this.user.role = this.userForm.get('role').value;
    this.user.worker = this.userForm.get('worker').value;
    var password_check = this.userForm.get('password_check').value;

    if(password_check==this.user.password){
    this._userService.register(this.user, this.token).subscribe(
      response => {
        if(response.user && response.user._id){
          this.status = 'success';
          this.message="Guardado exitosamente.";
          this.getUsers();
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    }else{
      
      this.message="No coincide la contraseña con la verificación.";
      this.status = 'error';
    }
  }

  ////////////////////////////////////////////////////////////
  //                   EDITAR USUARIO                      //
  ////////////////////////////////////////////////////////////
  onSubmitEditUser(){
    this.user.role = this.userEditForm.get('role').value;
    this.user.worker = this.userEditForm.get('worker').value;

    this._userService.editUser(this.token, this.user._id, this.user).subscribe(
      response => {
        if(response.user){
          this.status2 = 'success';
          this.message2="Cambios guardados exitosamente.";
          this.user = response.user;
          this.getUsers();
        }else{
          this.status2 = 'error';
          this.message2 = response.message;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //             CAMBIAR ESTADO DEL USUARIO                 //
  ////////////////////////////////////////////////////////////
  deactivateUser(user : User){
    this._userService.deactivateUser(this.token, user._id).subscribe(
      response => {
        if(!response.user){
          console.log("Error en el servidor");
        }
        this.getUsers();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateUser(user : User){
    this._userService.activateUser(this.token, user._id).subscribe(
      response => {
        if(!response.user){
          console.log("Error en el servidor");
        }
        this.getUsers();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //               OBTENER EMPLEADOS PARA SELECT            //
  ////////////////////////////////////////////////////////////
  getWorkersA(){
    this._workerService.getWorkersA(this.token).subscribe(
      response => {
        
        if(response.workers){
          this.workers = response.workers;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER USUARIOS Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getUsers(){
    this._userService.getUsers(this.token, this.identity._id, this.pag).subscribe(
      response => {
        
        if(response.users){
          this.users = response.users;
          this.totalRegistros = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  cambiarPag( valor: number){
    let pag = this.pag + valor;

    if( pag >= this.totalRegistros){
      return;
    }
    if ( pag < 0 ){
      return;
    }

    this.pag += valor;
    this.getUsers();
  }
}
