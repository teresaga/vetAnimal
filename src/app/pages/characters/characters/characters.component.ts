import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Character } from '../../../models/character';
import { CharacterService } from '../../../services/character.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  //Para form y registrar caracter
  characterForm: FormGroup;
  public character: Character;
  public status: string;

  //token
  public url: string;
  public token;

  //Variables para mostrar caracteres y realizar paginacion
  public characters: Character[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _characterService: CharacterService
  ) { 
    this.character = new Character('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.getCharacters();
    this.characterForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.characterForm.reset();
      }
    });
  }

  openModaledit(content, character: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.characterForm.reset();
      }
    });
    this.character._id = character._id;
    this.characterForm.get('name').setValue(character.name);
  }

  openModalStatus(content, character: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateCharacter(character);
      }
      if(result=='Activate'){
        this.activateCharacter(character);
      }
    }, (reason) => {
    });
    this.character.name = character.name;
  }

  ////////////////////////////////////////////////////////////
  //                    AGREGAR CARACTER                    //
  ////////////////////////////////////////////////////////////
  onSubmitAddCharacter(){
    this.character.name = this.characterForm.get('name').value;
    
    this._characterService.addCharacter(this.token, this.character).subscribe(
      response => {
        if(!response.character){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.character = response.character;
          this.getCharacters();
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
  //                     EDITAR CARACTER                    //
  ////////////////////////////////////////////////////////////
  onSubmitEditCharacter(){
    this.character.name = this.characterForm.get('name').value;

    this._characterService.editCharacter(this.token, this.character._id, this.character).subscribe(
      response => {
        if(!response.character){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.character = response.character;
          this.getCharacters();
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
  //               CAMBIAR ESTADO DE CARACTER               //
  ////////////////////////////////////////////////////////////
  deactivateCharacter(character : Character){
    this._characterService.deactivateCharacter(this.token, character._id).subscribe(
      response => {
        if(!response.character){
          console.log("Error en el servidor");
        }
        this.getCharacters();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateCharacter(character : Character){
    this._characterService.activateCharacter(this.token, character._id).subscribe(
      response => {
        if(!response.character){
          console.log("Error en el servidor");
        }
        this.getCharacters();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER CARACTER Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getCharacters(){
    this._characterService.getCharacters(this.pag).subscribe(
      response => {
        
        if(response.characters){
          this.characters = response.characters;
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
    this.getCharacters();
  }

}
