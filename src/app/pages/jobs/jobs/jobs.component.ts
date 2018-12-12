import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Job } from '../../../models/job';
import { JobService } from '../../../services/job.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  //Para form y registrar puesto
  jobForm: FormGroup;
  public job: Job;
  public status: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Variables para mostrar puestos y realizar paginacion
  public jobs: Job[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _jobService: JobService
  ) { 
    this.job = new Job('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.getJobs();
    this.jobForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.jobForm.reset();
      }
    });
  }

  openModaledit(content, job: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.jobForm.reset();
      }
    });
    this.job._id = job._id;
    this.jobForm.get('name').setValue(job.name);
  }

  openModalStatus(content, job: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateJob(job);
      }
      if(result=='Activate'){
        this.activateJob(job);
      }
    }, (reason) => {
    });
    this.job.name = job.name;
  }

  ////////////////////////////////////////////////////////////
  //                    AGREGAR PUESTO                      //
  ////////////////////////////////////////////////////////////
  onSubmitAddJob(){
    this.job.name = this.jobForm.get('name').value;
    
    this._jobService.addJob(this.token, this.job).subscribe(
      response => {
        if(!response.job){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.job = response.job;
          this.getJobs();
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
  onSubmitEditJob(){
    this.job.name = this.jobForm.get('name').value;

    this._jobService.editJob(this.token, this.job._id, this.job).subscribe(
      response => {
        if(!response.job){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.job = response.job;
          this.getJobs();
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
  deactivateJob(job : Job){
    this._jobService.deactivateJob(this.token, job._id).subscribe(
      response => {
        if(!response.job){
          console.log("Error en el servidor");
        }
        this.getJobs();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateJob(job : Job){
    this._jobService.activateJob(this.token, job._id).subscribe(
      response => {
        if(!response.job){
          console.log("Error en el servidor");
        }
        this.getJobs();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //          OBTENER PUESTOS Y REALIZAR PAGINACION         //
  ////////////////////////////////////////////////////////////
  getJobs(){
    this.cargando = true;
    this._jobService.getJobs(this.pag).subscribe(
      response => {
        
        if(response.jobs){
          this.jobs = response.jobs;
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
    this.getJobs();
  }
}
