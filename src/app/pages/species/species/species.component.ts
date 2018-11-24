import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Specie } from '../../../models/specie';
import { SpecieService } from '../../../services/specie.service';
@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  //Para form y registrar especies
  specieForm: FormGroup;
  public specie: Specie;
  public status: string;

  //token
  public url: string;
  public token;

  //Variables para mostrar especies y realizar paginacion
  public species: Specie[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _specieService: SpecieService
  ) { 
    this.specie = new Specie('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }
  ngOnInit() {
    this.getSpecies();
    this.specieForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.specieForm.reset();
      }
    });
  }

  openModaledit(content, specie: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.specieForm.reset();
      }
    });
    this.specie._id = specie._id;
    this.specieForm.get('name').setValue(specie.name);
  }

  openModalStatus(content, specie: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateSpecie(specie);
      }
      if(result=='Activate'){
        this.activateSpecie(specie);
      }
    }, (reason) => {
    });
    this.specie.name = specie.name;
  }

  ////////////////////////////////////////////////////////////
  //                    AGREGAR ESPECIES                    //
  ////////////////////////////////////////////////////////////
  onSubmitAddSpecie(){
    this.specie.name = this.specieForm.get('name').value;
    
    this._specieService.addSpecie(this.token, this.specie).subscribe(
      response => {
        if(!response.specie){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.specie = response.specie;
          this.getSpecies();
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
  //                     EDITAR ESPECIES                    //
  ////////////////////////////////////////////////////////////
  onSubmitEditSpecie(){
    this.specie.name = this.specieForm.get('name').value;

    this._specieService.editSpecie(this.token, this.specie._id, this.specie).subscribe(
      response => {
        if(!response.specie){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.specie = response.specie;
          this.getSpecies();
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
  //               CAMBIAR ESTADO DE ESPECIES               //
  ////////////////////////////////////////////////////////////
  deactivateSpecie(specie : Specie){
    this._specieService.deactivateSpecie(this.token, specie._id).subscribe(
      response => {
        if(!response.specie){
          console.log("Error en el servidor");
        }
        this.getSpecies();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateSpecie(specie : Specie){
    this._specieService.activateSpecie(this.token, specie._id).subscribe(
      response => {
        if(!response.specie){
          console.log("Error en el servidor");
        }
        this.getSpecies();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER ESPECIES Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getSpecies(){
    this._specieService.getSpecies(this.pag).subscribe(
      response => {
        
        if(response.species){
          this.species = response.species;
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
    this.getSpecies();
  }
}
