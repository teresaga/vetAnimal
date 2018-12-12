import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UploadService } from '../../../services/upload.service';

import { Consultation } from '../../../models/consultation';
import { ConsultationService } from '../../../services/consultation.service';
@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  @ViewChild('information') modalInfo: Element;
  @ViewChild('information2') modalInfo2: Element;

  //Para form y registrar consultas
  consultationForm: FormGroup;
  public consultation: Consultation;
  public status: string;
  public id: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Arreglos para selects
  public animals: Animal[];
  public animals2: Animal[];
  public clients: Client[];
  public clients2: Client[];

  //Variables para mostrar consultas y realizar paginacion
  public busquedaClient = null;
  public busquedaClient2 = null;
  public busquedaAnimal = null;
  public busquedaFechaDe = null;
  public busquedaFechaHasta = null;
  public consultations: Consultation[];
  public busqueda;
  public busqueda3;
  public busqueda4;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _clientService: ClientService,
    private _animalService: AnimalService,
    private _consultationService: ConsultationService
  ) { 
    this.consultation = new Consultation('','','','','','','','');

    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
    var date = new Date();
    this.busquedaFechaDe=date.toISOString().slice(0,10);
    this.busquedaFechaHasta=date.toISOString().slice(0,10);
  }
  openModalBusqueda(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  ngOnInit() {
    this.cargando = false;
    this.getClients();
    this.consultationForm = this.pf.group({
      client: ['', Validators.required],
      animal: ['', Validators.required],
      weight: ['', Validators.required],
      temperature: ['', Validators.required],
      notes: [''],
      image: ['']
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.consultationForm.reset();
      }
    });
    this.consultationForm.reset();
    this.consultation.image='';
    this.getClientsA();
  }

  openModaldetails(content, consultation: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.consultation.client = consultation.client.name + " " + consultation.client.paternal_surname;
    if (consultation.client.maternal_surname){
      this.consultation.client = this.consultation.client + " " + consultation.client.maternal_surname;
    }
    this.consultation.animal = consultation.animal.name;
    this.consultation.weight = consultation.weight;
    this.consultation.temperature = consultation.temperature;
    this.consultation.image = consultation.image;
    this.consultation.notes = consultation.notes;
    this.consultation.date = consultation.date;
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ////////////////////////////////////////////////////////////
  //          AGREGAR CONSULTA Y GUARDAR IMAGEN             //
  ////////////////////////////////////////////////////////////
  onSubmitAddConsultation(){
    this.consultation.client = this.consultationForm.get('client').value;
    this.consultation.animal = this.consultationForm.get('animal').value;
    this.consultation.weight = this.consultationForm.get('weight').value;
    this.consultation.temperature = this.consultationForm.get('temperature').value;
    this.consultation.notes = this.consultationForm.get('notes').value;
    
    this._consultationService.addConsultation(this.token, this.consultation).subscribe(
      response => {
        if(!response.consultation){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.consultation = response.consultation;

          if(this.fileToUpload && this.consultationForm.get('image').value!=null){
            //Subir imagen del animal
            this._uploadService.makeFileRequest(this.url+'upload-image-consultation/'+this.consultation._id, [], this.fileToUpload, this.token, 'image')
            .then((result: any) => {
              this.consultation.image = result.image;
            });
          }         
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

  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files;
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

  getHistoryOfAnimal(){
    this.cargando = true;
    if(this.busquedaAnimal==null || this.busquedaAnimal=="null"){
      this.cargando=false;
      this.openModalInfo(this.modalInfo2);
    }else{
      this._consultationService.getHistoryOfAnimal(this.token, this.busquedaAnimal, this.pag, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
        response => {
          console.log(response);
          if(response.consultations){
            this.consultations = response.consultations;
            this.totalRegistros = response.total;
            this.cargando = false;
            if(this.totalRegistros==0){
              this.openModalInfo(this.modalInfo);
            }
          }
        }, error => {
          console.log(<any>error);
        } 
        
      );
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
    this.getHistoryOfAnimal();
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
    this._animalService.getAnimalsAClient(this.token, this.busquedaClient2).subscribe(
      response => {
        
        if(response.animals){
          this.animals2 = response.animals;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }  

  changeClient2(){
    this.consultationForm.get('animal').setValue(null);
    this.busquedaClient2= this.consultationForm.get('client').value;
    if (this.busquedaClient2!="null"){
      this.getAnimalsAClient();
    }else{
      this.consultationForm.get('client').setValue(null);
    }
  }

  changeDatos(){
    this.pag=0;
    this.totalRegistros=0;
    this.consultations=[];
  }
}
