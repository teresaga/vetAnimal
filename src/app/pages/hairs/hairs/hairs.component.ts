import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Hair } from '../../../models/hair';
import { HairService } from '../../../services/hair.service';
@Component({
  selector: 'app-hairs',
  templateUrl: './hairs.component.html',
  styleUrls: ['./hairs.component.css']
})
export class HairsComponent implements OnInit {
  //Para form y registrar tipo de pelo
  hairForm: FormGroup;
  public hair: Hair;
  public status: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar tipo de pelo y realizar paginacion
  public hairs: Hair[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

constructor(
  private pf: FormBuilder,
  private modalService: NgbModal,
  private _userService: UserService,
  private _hairService: HairService
) { 
  this.hair = new Hair('','','','','');
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.status = "";
}

ngOnInit() {
  this.cargando = false;
  this.getHairs();
  this.hairForm = this.pf.group({
    name: ['', Validators.required]
  });
}

openModal(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
    
  }, (reason) => {
    if(this.status=='success'){
      this.status='';
      this.hairForm.reset();
    }
  });
}

openModaledit(content, hair: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
  }, (reason) => {
    if(this.status=='success'){
      this.status='';
      this.hairForm.reset();
    }
  });
  this.hair._id = hair._id;
  this.hairForm.get('name').setValue(hair.name);
}

openModalStatus(content, hair: any){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    if(result=='Deactivate'){
      this.deactivateHair(hair);
    }
    if(result=='Activate'){
      this.activateHair(hair);
    }
  }, (reason) => {
  });
  this.hair.name = hair.name;
}

////////////////////////////////////////////////////////////
//                  AGREGAR TIPO DE PELO                  //
////////////////////////////////////////////////////////////
onSubmitAddHair(){
  this.hair.name = this.hairForm.get('name').value;
  
  this._hairService.addHair(this.token, this.hair).subscribe(
    response => {
      if(!response.hair){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.hair = response.hair;
        this.getHairs();
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
//                   EDITAR TIPO DE PELO                  //
////////////////////////////////////////////////////////////
onSubmitEditHair(){
  this.hair.name = this.hairForm.get('name').value;

  this._hairService.editHair(this.token, this.hair._id, this.hair).subscribe(
    response => {
      if(!response.hair){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.hair = response.hair;
        this.getHairs();
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
//            CAMBIAR ESTADO DE TIPO DE PELO              //
////////////////////////////////////////////////////////////
deactivateHair(hair : Hair){
  this._hairService.deactivateHair(this.token, hair._id).subscribe(
    response => {
      if(!response.hair){
        console.log("Error en el servidor");
      }
      this.getHairs();
    },error  => {
      console.log("Error en el servidor");
    }
  );
}

activateHair(hair : Hair){
  this._hairService.activateHair(this.token, hair._id).subscribe(
    response => {
      if(!response.hair){
        console.log("Error en el servidor");
      }
      this.getHairs();
    },error  => {
      console.log("Error en el servidor");
    }
  );
}
////////////////////////////////////////////////////////////
//      OBTENER TIPO DE PELO Y REALIZAR PAGINACION        //
////////////////////////////////////////////////////////////
getHairs(){
  this.cargando = true;
  this._hairService.getHairs(this.pag).subscribe(
    response => {
      
      if(response.hairs){
        this.hairs = response.hairs;
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
  this.getHairs();
}

}
