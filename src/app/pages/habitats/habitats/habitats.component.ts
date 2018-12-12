import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Habitat } from '../../../models/habitat';
import { HabitatService } from '../../../services/habitat.service';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.css']
})
export class HabitatsComponent implements OnInit {
  //Para form y registrar habitat
  habitatForm: FormGroup;
  public habitat: Habitat;
  public status: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar habitat y realizar paginacion
  public habitats: Habitat[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

constructor(
  private pf: FormBuilder,
  private modalService: NgbModal,
  private _userService: UserService,
  private _habitatService: HabitatService
) { 
  this.habitat = new Habitat('','','','','');
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.status = "";
}

ngOnInit() {
  this.cargando = false;
  this.getHabitats();
  this.habitatForm = this.pf.group({
    name: ['', Validators.required]
  });
}

openModal(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
    
  }, (reason) => {
    if(this.status=='success'){
      this.status='';
      this.habitatForm.reset();
    }
  });
}

openModaledit(content, habitat: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
  }, (reason) => {
    if(this.status=='success'){
      this.status='';
      this.habitatForm.reset();
    }
  });
  this.habitat._id = habitat._id;
  this.habitatForm.get('name').setValue(habitat.name);
}

openModalStatus(content, habitat: any){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    if(result=='Deactivate'){
      this.deactivateHabitat(habitat);
    }
    if(result=='Activate'){
      this.activateHabitat(habitat);
    }
  }, (reason) => {
  });
  this.habitat.name = habitat.name;
}

////////////////////////////////////////////////////////////
//                    AGREGAR HABITAT                     //
////////////////////////////////////////////////////////////
onSubmitAddHabitat(){
  this.habitat.name = this.habitatForm.get('name').value;
  
  this._habitatService.addHabitat(this.token, this.habitat).subscribe(
    response => {
      if(!response.habitat){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.habitat = response.habitat;
        this.getHabitats();
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
//                     EDITAR HABITAT                     //
////////////////////////////////////////////////////////////
onSubmitEditHabitat(){
  this.habitat.name = this.habitatForm.get('name').value;

  this._habitatService.editHabitat(this.token, this.habitat._id, this.habitat).subscribe(
    response => {
      if(!response.habitat){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.habitat = response.habitat;
        this.getHabitats();
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
//               CAMBIAR ESTADO DE HABITAT                //
////////////////////////////////////////////////////////////
deactivateHabitat(habitat : Habitat){
  this._habitatService.deactivateHabitat(this.token, habitat._id).subscribe(
    response => {
      if(!response.habitat){
        console.log("Error en el servidor");
      }
      this.getHabitats();
    },error  => {
      console.log("Error en el servidor");
    }
  );
}

activateHabitat(habitat : Habitat){
  this._habitatService.activateHabitat(this.token, habitat._id).subscribe(
    response => {
      if(!response.habitat){
        console.log("Error en el servidor");
      }
      this.getHabitats();
    },error  => {
      console.log("Error en el servidor");
    }
  );
}
////////////////////////////////////////////////////////////
//          OBTENER HABITAT Y REALIZAR PAGINACION         //
////////////////////////////////////////////////////////////
getHabitats(){
  this.cargando = true;
  this._habitatService.getHabitats(this.pag).subscribe(
    response => {
      
      if(response.habitats){
        this.habitats = response.habitats;
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
  this.getHabitats();
}

}
