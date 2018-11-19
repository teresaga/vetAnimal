import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  //Para form y registrar animales
  animalForm: FormGroup;
  public animal: Animal;
  public status: string;
  public id: string;

  //token
  public url: string;
  public token;

  //Variables para mostrar animales y realizar paginacion
  public animals: Animal[];
  public busquedaClient = null;
  pag: number = 0;
  totalRegistros: number = 0;

  //Arreglos para selects
  public clients: Client[];

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _clientService: ClientService,
    private _animalService: AnimalService
  ) { 
    this.animal = new Animal('','','','','','','','','','','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.getClients();
  }

  ////////////////////////////////////////////////////////////
  //    OBTENER CLIENTES, ANIMALES Y REALIZAR PAGINACION    //
  ////////////////////////////////////////////////////////////
  getClients(){
    this._clientService.getClients(this.token, this.pag).subscribe(
      response => {
        
        if(response.clients){
          this.clients = response.clients;
          this.totalRegistros = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getAnimalsofClient(){
    this._animalService.getAnimalsClient(this.token, this.busquedaClient).subscribe(
      response => {
        
        if(response.animals){
          this.animals = response.animals;
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
    this.getClients();
  }
}
