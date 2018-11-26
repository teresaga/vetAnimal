import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from '../../../services/worker.service';

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
    public workers: Worker[];
    public services: Product[];

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
      private _workerService: WorkerService,
      private _productService: ProductService,
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
    this.activityForm = this.pf.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      service: ['', Validators.required],
      client: ['', Validators.required],
      animal: ['', Validators.required],
      worker: ['', Validators.required],
      notes: ['']
    });
    this.getServicesA();
    this.getWorkersA();
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.activityForm.reset();
      }
    });
    this.activityForm.reset();
    this.getClientsA();
  }

  openModaledit(content, activity: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.activityForm.reset();
      }
    });
    this.getClientsA();
    this.activity._id = activity._id;
    if(activity.client.status=='B'){
      this.activityForm.get('client').reset();
    }else{
      this.activityForm.get('client').setValue(activity.client._id);
      this.getAnimalsAClient();
    }
    if(activity.animal.status=='B' || activity.client.status=='B'){
      this.activityForm.get('animal').reset();
    }else{
      this.activityForm.get('animal').setValue(activity.animal._id);
    }
    if(activity.worker.status=='B'){
      this.activityForm.get('worker').reset();
    }else{
      this.activityForm.get('worker').setValue(activity.worker._id);
    }
    if(activity.service.status=='B'){
      this.activityForm.get('service').reset();
    }else{
      this.activityForm.get('service').setValue(activity.service._id);
    }
    this.activityForm.get('notes').setValue(activity.notes);
    
    var substr = (activity.date).substr(0,10);
    var substr2 = (activity.date).substr(11,5);
    this.activityForm.get('date').setValue(substr);
    this.activityForm.get('time').setValue(substr2);

  }

  openModalStatus(content, activity: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.finishActivity(activity);
      }
      if(result=='Activate'){
        this.startActivity(activity);
      }
    }, (reason) => {
    });
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ////////////////////////////////////////////////////////////
  //                  AGREGAR ACTIVIDAD                     //
  ////////////////////////////////////////////////////////////
  onSubmitAddActivity(){
    this.activity.client = this.activityForm.get('client').value;
    this.activity.animal = this.activityForm.get('animal').value;
    this.activity.worker = this.activityForm.get('worker').value;
    this.activity.service = this.activityForm.get('service').value;
    this.activity.notes = this.activityForm.get('notes').value;
    var date = this.activityForm.get('date').value;
    var time = this.activityForm.get('time').value;
    this.activity.date =    date+" "+time+":00.000";
    
    this._activityService.addActivity(this.token, this.activity).subscribe(
      response => {
        if(!response.activity){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.activity = response.activity;
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
  //                   EDITAR ACTIVIDAD                     //
  ////////////////////////////////////////////////////////////
  onSubmitEditActivity(){
    this.activity.client = this.activityForm.get('client').value;
    this.activity.animal = this.activityForm.get('animal').value;
    this.activity.worker = this.activityForm.get('worker').value;
    this.activity.service = this.activityForm.get('service').value;
    this.activity.notes = this.activityForm.get('notes').value;
    var date = this.activityForm.get('date').value;
    var time = this.activityForm.get('time').value;
    this.activity.date =    date+" "+time+":00.000";
    
    this._activityService.editActivity(this.token, this.activity._id, this.activity).subscribe(
      response => {
        if(!response.activity){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.activity = response.activity;
          this.getActivities();
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
  //             CAMBIAR ESTADO DE ACTIVIDAD                //
  ////////////////////////////////////////////////////////////
  finishActivity(activity : Activity){
    this._activityService.finishActivity(this.token, activity._id).subscribe(
      response => {
        if(!response.activity){
          console.log("Error en el servidor");
        }
        this.getActivities();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  startActivity(activity : Activity){
    this._activityService.startActivity(this.token, activity._id).subscribe(
      response => {
        if(!response.activity){
          console.log("Error en el servidor");
        }
        this.getActivities();
      },error  => {
        console.log("Error en el servidor");
      }
    );
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

    if((this.busquedaStatus!=null && this.busquedaStatus!="null") && (this.busquedaAnimal!=null && this.busquedaAnimal!="null") && (this.busquedaClient!=null && this.busquedaClient!="null")){
      this._activityService.getActivities_animalStatusDate(this.token, this.pag, this.busquedaAnimal, this.busquedaStatus, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
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
    if((this.busquedaStatus==null || this.busquedaStatus=="null") && (this.busquedaAnimal!=null && this.busquedaAnimal!="null") && (this.busquedaClient!=null && this.busquedaClient!="null")){
      this._activityService.getActivities_animalDate(this.token, this.pag, this.busquedaAnimal, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
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
    if((this.busquedaStatus!=null && this.busquedaStatus!="null") && (this.busquedaAnimal==null || this.busquedaAnimal=="null") && (this.busquedaClient==null || this.busquedaClient=="null")){
      this._activityService.getActivities_statusDate(this.token, this.pag, this.busquedaStatus, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
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
    if((this.busquedaStatus==null || this.busquedaStatus=="null") && (this.busquedaAnimal==null || this.busquedaAnimal=="null") && (this.busquedaClient==null || this.busquedaClient=="null")){
      this._activityService.getActivities_date(this.token, this.pag, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
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
    if((this.busquedaFechaDe==null) && this.busquedaFechaHasta==null){
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

  ////////////////////////////////////////////////////////////
  //             OBTENER REGISTROS PARA SELECTS             //
  ////////////////////////////////////////////////////////////
  //Obtener registros de Clientes activos
  getClientsA(){
    this._clientService.getClientsA(this.token).subscribe(
      response => {
        if(response.clients){
          this.clients2 = response.clients;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener registros de Animales activos
  getAnimalsAClient(){
    this.activityForm.get('animal').reset();
    var busquedaClient2 = this.activityForm.get('client').value;
    if (busquedaClient2=="null" || busquedaClient2==null){
      this.activityForm.get('animal').setValue("null");
    }else{
      this._animalService.getAnimalsAClient(this.token, busquedaClient2).subscribe(
        response => {
          
          if(response.animals){
            this.animals2 = response.animals;
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
    }
  }  

  //Obtener registros de Servicios activos
  getServicesA(){
    this._productService.getProductsServicesA(this.token).subscribe(
      response => {
        if(response.services){
          this.services = response.services;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener registros de Empleados activos
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

  changeClient2(){
    this.activityForm.get('animal').setValue(null);
    this.busquedaClient2= this.activityForm.get('client').value;
    if (this.busquedaClient2!="null"){
      this.getAnimalsAClient();
    }else{
      this.activityForm.get('client').setValue(null);
    }
  }

  changeDatos(){
    this.pag=0;
    this.totalRegistros=0;
    this.activities=[];
  }
}
