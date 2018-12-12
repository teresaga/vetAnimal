import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  //Para form y registrar clientes
  clientForm: FormGroup;
  public client: Client;
  public status: string;
  public id: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar clientes y realizar paginacion
  public clients: Client[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _clientService: ClientService
  ) { 
    this.client = new Client('','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.cargando = false;
    this.getClients();

    this.clientForm = this.pf.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: [''],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.clientForm.reset();
      }
    });
    this.clientForm.reset();
  }

  openModaledit(content, client: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.clientForm.reset();
      }
    });
    this.client._id = client._id;
    this.clientForm.get('name').setValue(client.name);
    this.clientForm.get('paternal_surname').setValue(client.paternal_surname);
    this.clientForm.get('maternal_surname').setValue(client.maternal_surname);
    var p = client.birthdate;
    this.clientForm.get('birthdate').setValue(  p.split('/')[2] + "-" + p.split('/')[1] + "-" + p.split('/')[0]);

    this.clientForm.get('address').setValue(client.address);
    this.clientForm.get('email').setValue(client.email);
    this.clientForm.get('tel').setValue(client.tel);
  }

  openModalStatus(content, client: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateClient(client);
      }
      if(result=='Activate'){
        this.activateClient(client);
      }
    }, (reason) => {
    });
    this.client.name = client.name;
    this.client.paternal_surname = client.paternal_surname;
    this.client.maternal_surname = client.maternal_surname;
  }

  openModaldetails(content, client: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.client = client;
  }
  ////////////////////////////////////////////////////////////
  //                   AGREGAR CLIENTE                      //
  ////////////////////////////////////////////////////////////
  onSubmitAddClient(){
    this.client.name = this.clientForm.get('name').value;
    this.client.paternal_surname = this.clientForm.get('paternal_surname').value;
    this.client.maternal_surname = this.clientForm.get('maternal_surname').value;
    var p = this.clientForm.get('birthdate').value;
    this.client.birthdate = p.split('-')[2] + "/" + p.split('-')[1] + "/" + p.split('-')[0];
    this.client.address = this.clientForm.get('address').value;
    this.client.email = this.clientForm.get('email').value;
    this.client.tel = this.clientForm.get('tel').value;

    this._clientService.addClient(this.token, this.client).subscribe(
      response => {
        if(!response.client){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.client = response.client;
          this.getClients();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //                   EDITAR CLIENTE                       //
  ////////////////////////////////////////////////////////////
  onSubmitEditClient(){
    this.client.name = this.clientForm.get('name').value;
    this.client.paternal_surname = this.clientForm.get('paternal_surname').value;
    this.client.maternal_surname = this.clientForm.get('maternal_surname').value;
    var p = this.clientForm.get('birthdate').value;
    this.client.birthdate = p.split('-')[2] + "/" + p.split('-')[1] + "/" + p.split('-')[0];
    this.client.address = this.clientForm.get('address').value;
    this.client.email = this.clientForm.get('email').value;
    this.client.tel = this.clientForm.get('tel').value;

    this._clientService.editClient(this.token, this.client._id, this.client).subscribe(
      response => {
        if(!response.client){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.client = response.client;
          this.getClients();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //             CAMBIAR ESTADO DE CLIENTE                 //
  ////////////////////////////////////////////////////////////
  deactivateClient(client : Client){
    this._clientService.deactivateClient(this.token, client._id).subscribe(
      response => {
        if(!response.client){
          console.log("Error en el servidor");
        }
        this.getClients();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateClient(client : Client){
    this._clientService.activateClient(this.token, client._id).subscribe(
      response => {
        if(!response.client){
          console.log("Error en el servidor");
        }
        this.getClients();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //         OBTENER CLIENTES Y REALIZAR PAGINACION         //
  ////////////////////////////////////////////////////////////
  getClients(){
    this.cargando = true;
    this._clientService.getClients(this.token, this.pag).subscribe(
      response => {
        
        if(response.clients){
          this.clients = response.clients;
          this.totalRegistros = response.total;
          this.cargando = false;
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
    this.getClients();
  }

}
