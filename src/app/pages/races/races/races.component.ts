import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Specie } from '../../../models/specie';
import { SpecieService } from '../../../services/specie.service';

import { Race } from '../../../models/race';
import { RaceService } from '../../../services/race.service';
@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  //Para form y registrar razas
  raceForm: FormGroup;
  public race: Race;
  public status: string;

  //token
  public url: string;
  public token;

  //Variables para mostrar razas y realizar paginacion
  public races: Race[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  //Arreglos para select
  public species: Specie[];

  constructor(
    private pf: FormBuilder,
    private _specieService: SpecieService,
    private modalService: NgbModal,
    private _userService: UserService,
    private _raceService: RaceService
  ) { 
    this.race = new Race('','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.raceForm = this.pf.group({
      name: ['', Validators.required],
      specie: ['', Validators.required]
    });
    
    this.getSpeciesA();
    this.getRaces();
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.raceForm.reset();
      }
    });
  }

  openModaledit(content, race: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.raceForm.reset();
      }
    });
    this.race._id = race._id;
    this.raceForm.get('name').setValue(race.name);
    this.raceForm.get('specie').setValue(race.specie._id);
  }

  openModalStatus(content, race: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateRace(race);
      }
      if(result=='Activate'){
        this.activateRace(race);
      }
    }, (reason) => {
    });
    this.race.name = race.name;
  }
  ////////////////////////////////////////////////////////////
  //                    AGREGAR RAZA                        //
  ////////////////////////////////////////////////////////////
  onSubmitAddRace(){
    this.race.name = this.raceForm.get('name').value;
    this.race.specie = this.raceForm.get('specie').value;

    this._raceService.addRace(this.token, this.race).subscribe(
      response => {
        if(!response.race){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.race = response.race;
          this.getRaces();
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
  //                     EDITAR RAZA                        //
  ////////////////////////////////////////////////////////////
  onSubmitEditRace(){
    this.race.name = this.raceForm.get('name').value;
    this.race.specie = this.raceForm.get('specie').value;

    this._raceService.editRace(this.token, this.race._id, this.race).subscribe(
      response => {
        if(!response.race){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.race = response.race;
          this.getRaces();
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
  //               CAMBIAR ESTADO DE RAZA                   //
  ////////////////////////////////////////////////////////////
  deactivateRace(race : Race){
    this._raceService.deactivateRace(this.token, race._id).subscribe(
      response => {
        if(!response.race){
          console.log("Error en el servidor");
        }
        this.getRaces();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateRace(race : Race){
    this._raceService.activateRace(this.token, race._id).subscribe(
      response => {
        if(!response.race){
          console.log("Error en el servidor");
        }
        this.getRaces();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //             OBTENER REGISTROS PARA SELECTS             //
  ////////////////////////////////////////////////////////////
  getSpeciesA(){
    this._specieService.getSpeciesA().subscribe(
      response => {
        if(response.species){
          this.species = response.species;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER RAZAS Y REALIZAR PAGINACION           //
  ////////////////////////////////////////////////////////////
  getRaces(){
    this._raceService.getRaces(this.pag).subscribe(
      response => {
        
        if(response.races){
          this.races = response.races;
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
    this.getRaces();
  }
}
