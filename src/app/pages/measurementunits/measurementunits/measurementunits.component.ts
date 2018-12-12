import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Measurementunit } from '../../../models/measurementunit';
import { MeasurementunitService } from '../../../services/measurementunit.service';
@Component({
  selector: 'app-measurementunits',
  templateUrl: './measurementunits.component.html',
  styleUrls: ['./measurementunits.component.css']
})
export class MeasurementunitsComponent implements OnInit {
  unitForm: FormGroup;
  public measurementunit: Measurementunit;
  public status: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar puestos y realizar paginacion
  public measurementunits: Measurementunit[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _measurementunitService: MeasurementunitService,
  ) { 
    this.measurementunit = new Measurementunit('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.cargando = false;
    this.getMeasurementunits();
    this.unitForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.unitForm.reset();
      }
    });
  }

  openModaledit(content, unit: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.unitForm.reset();
      }
    });
    this.measurementunit._id = unit._id;
    this.unitForm.get('name').setValue(unit.name);
  }

  openModalStatus(content, unit: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateUnit(unit);
      }
      if(result=='Activate'){
        this.activateUnit(unit);
      }
    }, (reason) => {
    });
    this.measurementunit.name = unit.name;
  }


  ////////////////////////////////////////////////////////////
  //                    AGREGAR UNIDAD                      //
  ////////////////////////////////////////////////////////////
  onSubmitAddUnit(){
    this.measurementunit.name = this.unitForm.get('name').value;

    this._measurementunitService.addMeasurementunit(this.token, this.measurementunit).subscribe(
      response => {
        if(!response.measurementunit){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.measurementunit = response.measurementunit;
          this.getMeasurementunits();
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
  //                     EDITAR PUESTO                      //
  ////////////////////////////////////////////////////////////
  onSubmitEditUnit(){
    this.measurementunit.name = this.unitForm.get('name').value;

    this._measurementunitService.editMeasurementunit(this.token, this.measurementunit._id, this.measurementunit).subscribe(
      response => {
        if(!response.measurementunit){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.measurementunit = response.measurementunit;
          this.getMeasurementunits();
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
  //               CAMBIAR ESTADO DE PUESTO                 //
  ////////////////////////////////////////////////////////////
  deactivateUnit(unit : Measurementunit){
    this._measurementunitService.deactivateMeasurementunit(this.token, unit._id).subscribe(
      response => {
        if(!response.measurementunit){
          console.log("Error en el servidor");
        }
        this.getMeasurementunits();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateUnit(unit : Measurementunit){
    this._measurementunitService.activateMeasurementunit(this.token, unit._id).subscribe(
      response => {
        if(!response.measurementunit){
          console.log("Error en el servidor");
        }
        this.getMeasurementunits();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER UNIDADES Y REALIZAR PAGINACION         //
  ////////////////////////////////////////////////////////////
  getMeasurementunits(){
    this.cargando = true;
    this._measurementunitService.getMeasurementunits(this.pag).subscribe(
      response => {
        
        if(response.measurementunits){
          this.measurementunits = response.measurementunits;
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
    this.getMeasurementunits();
  }

}
