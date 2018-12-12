import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  //Para form y registrar proveedores
  providerForm: FormGroup;
  public provider: Provider;
  public status: string;
  public status2: string;
  public id: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar proveedores y realizar paginacion
  public providers: Provider[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _providerService: ProviderService
  ) { 
    this.provider = new Provider('','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
    this.status2 = "";
  }

  ngOnInit() {
    this.cargando = false;
    this.getProviders();
    
    this.providerForm = this.pf.group({
      name: ['', Validators.required],
      business_name: ['', Validators.required],
      rfc: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_person: ['', Validators.required],
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.providerForm.reset();
      }
    });
    this.providerForm.reset();
  }

  openModaledit(content, provider: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.providerForm.reset();
      }
    });
    this.provider._id = provider._id;
    this.providerForm.get('name').setValue(provider.name);
    this.providerForm.get('business_name').setValue(provider.business_name);
    this.providerForm.get('contact_person').setValue(provider.contact_person);
    this.providerForm.get('rfc').setValue(provider.rfc);
    this.providerForm.get('address').setValue(provider.address);
    this.providerForm.get('email').setValue(provider.email);
    this.providerForm.get('tel').setValue(provider.tel);
  }

  openModalStatus(content, provider: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateProvider(provider);
      }
      if(result=='Activate'){
        this.activateProvider(provider);
      }
    }, (reason) => {
    });
    this.provider.name = provider.name;
  }

  openModaldetails(content, provider: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.provider = provider;
  }
  ////////////////////////////////////////////////////////////
  //                   AGREGAR PROVEEDOR                    //
  ////////////////////////////////////////////////////////////
  onSubmitAddProvider(){
    this.provider.name = this.providerForm.get('name').value;
    this.provider.business_name = this.providerForm.get('business_name').value;
    this.provider.contact_person = this.providerForm.get('contact_person').value;
    this.provider.rfc = this.providerForm.get('rfc').value;
    this.provider.address = this.providerForm.get('address').value;
    this.provider.email = this.providerForm.get('email').value;
    this.provider.tel = this.providerForm.get('tel').value;

    this._providerService.addProvider(this.token, this.provider).subscribe(
      response => {
        if(!response.provider){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.provider = response.provider;
          this.getProviders();
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
  //                   EDITAR PROVEEDOR                     //
  ////////////////////////////////////////////////////////////
  onSubmitEditProvider(){
    this.provider.name = this.providerForm.get('name').value;
    this.provider.business_name = this.providerForm.get('business_name').value;
    this.provider.contact_person = this.providerForm.get('contact_person').value;
    this.provider.rfc = this.providerForm.get('rfc').value;
    this.provider.address = this.providerForm.get('address').value;
    this.provider.email = this.providerForm.get('email').value;
    this.provider.tel = this.providerForm.get('tel').value;

    this._providerService.editProvider(this.token, this.provider._id, this.provider).subscribe(
      response => {
        if(!response.provider){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.provider = response.provider;
          this.getProviders();
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
  //             CAMBIAR ESTADO DE PROVEEDOR                //
  ////////////////////////////////////////////////////////////
  deactivateProvider(provider : Provider){
    this._providerService.deactivateProvider(this.token, provider._id).subscribe(
      response => {
        if(!response.provider){
          console.log("Error en el servidor");
        }
        this.getProviders();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateProvider(provider : Provider){
    this._providerService.activateProvider(this.token, provider._id).subscribe(
      response => {
        if(!response.provider){
          console.log("Error en el servidor");
        }
        this.getProviders();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //         OBTENER PROVEEDOR Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getProviders(){
    this.cargando = true;
    this._providerService.getProviders(this.token, this.pag).subscribe(
      response => {
        
        if(response.providers){
          this.providers = response.providers;
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
    this.getProviders();
  }


}
