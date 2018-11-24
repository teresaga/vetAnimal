import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';

import { Activity } from '../../../models/activity';
import { ActivityService } from '../../../services/activity.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    @ViewChild('information') modalInfo: Element;
    //Para form y registrar actividades
    activityForm: FormGroup;
    public activity: Activity;
    public status: string;
    public id: string;

    //token
    public url: string;
    public token;

    //Arreglos para selects
    public animals: Animal[];
    public animals2: Animal[];
    public clients: Client[];
    public clients2: Client[];

    //Variables para mostrar actividades y realizar paginacion
    public busquedaClient = null;
    public busquedaClient2 = null;
    public busquedaAnimal = null;
    public busquedaStatus = null;
    public busquedaFechaDe = null;
    public busquedaFechaHasta = null;
    public activities: Activity[];
    public busqueda;
    pag: number = 0;
    totalRegistros: number = 0;

    constructor(
      private pf: FormBuilder,
      private modalService: NgbModal,
      private _userService: UserService,
      private _clientService: ClientService,
      private _animalService: AnimalService,
      private _activityService: ActivityService
    ) { 
      this.activity = new Activity('','','','','','','','','','');

      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.status = "";
      var date = new Date();
      this.busquedaFechaDe=date.toISOString().slice(0,10);
      this.busquedaFechaHasta=date.toISOString().slice(0,10);
    }

  ngOnInit() {
    this.getClients();
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  ////////////////////////////////////////////////////////////
  //  OBTENER CLIENTES, ANIMALES, CONSULTAS Y PAGINACION   //
  ////////////////////////////////////////////////////////////
  getClients(){
    this._clientService.getClientsSelect(this.token).subscribe(
      response => {
        
        if(response.clients){
          this.clients = response.clients;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getAnimalsofClient(){
    this._animalService.getAnimalsSelect(this.token, this.busquedaClient).subscribe(
      response => {
        
        if(response.animals){
          this.animals = response.animals;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  changeClient(){
    this.busquedaAnimal=null;
    if (this.busquedaClient!=null){
      this.getAnimalsofClient();
    }
  }

  getActivities(){
    console.log(this.busquedaStatus);
    console.log(this.busquedaAnimal);
    console.log(this.busquedaClient);
    console.log(this.busquedaFechaDe);
    console.log(this.busquedaFechaHasta);

    if(this.busquedaStatus!=null && this.busquedaAnimal!=null && this.busquedaClient!=null){
      this._activityService.getActivities_animalStatusDate(this.token, this.pag, this.busquedaAnimal, this.status, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
          console.log(response);
          if(response.activities){
            this.activities = response.activities;
            this.totalRegistros = response.total;
            if(this.totalRegistros==0){
              this.openModalInfo(this.modalInfo);
            }
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
    if(this.busquedaStatus==null && this.busquedaAnimal!=null && this.busquedaClient!=null){
      this._activityService.getActivities_animalDate(this.token, this.pag, this.busquedaAnimal, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
          console.log(response);
          if(response.activities){
            this.activities = response.activities;
            this.totalRegistros = response.total;
            if(this.totalRegistros==0){
              this.openModalInfo(this.modalInfo);
            }
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
    if(this.busquedaStatus!=null && this.busquedaAnimal==null && this.busquedaClient==null){
      this._activityService.getActivities_statusDate(this.token, this.pag, this.busquedaStatus, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
          console.log(response);
          if(response.activities){
            this.activities = response.activities;
            this.totalRegistros = response.total;
            if(this.totalRegistros==0){
              this.openModalInfo(this.modalInfo);
            }
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
    if(this.busquedaStatus==null && this.busquedaAnimal==null && this.busquedaClient==null){
      this._activityService.getActivities_date(this.token, this.pag, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
          console.log(response);
          if(response.activities){
            this.activities = response.activities;
            this.totalRegistros = response.total;
            if(this.totalRegistros==0){
              this.openModalInfo(this.modalInfo);
            }
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
    if(this.busquedaFechaDe==null && this.busquedaFechaHasta==null){
      this.openModalInfo(this.modalInfo);
    }
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
    this.getActivities();
  }
}
