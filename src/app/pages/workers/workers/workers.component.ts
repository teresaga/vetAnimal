import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';
import { GLOBAL } from '../../../services/global';
import { Job } from '../../../models/job';
import { JobService } from '../../../services/job.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  //Variables para registrar puestos
  jobForm: FormGroup;
  //workerForm: FormGroup;
  public job: Job;
  public status: string;

  //Variables busqueda de empleados
  public workers: Worker[];
  public token;
  public busqueda;

  //Variables para paginacion
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _workerService: WorkerService,
    private _userService: UserService,
    private _jobService: JobService
  ){
    this.token = this._userService.getToken();
    this.job = new Job('','','','','');
    this.status = "";
  }
  
  ngOnInit() {
    this.getWorkers();
    this.jobForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

  deactivateWorker(id){
    $('#desactiveWorker-'+id).modal('hide');
    this._workerService.deactivateWorker(this.token, id).subscribe(
      response => {
        if(!response.worker){
          console.log("Error en el servidor");
        }
        this.getWorkers();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateWorker(id){
    $('#activeWorker-'+id).modal('hide');
    this._workerService.activateWorker(this.token, id).subscribe(
      response => {
        if(!response.worker){
          console.log("Error en el servidor");
        }
        this.getWorkers();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  getWorkers(){
    this._workerService.getWokers(this.token, this.pag).subscribe(
      response => {
        
        if(response.workers){
          this.workers = response.workers;
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
    this.getWorkers();
  }

  //onSubmit para Puestos
  onSubmit(){
    this.job.name = this.jobForm.get('name').value;
    
    this._jobService.addJob(this.token, this.job).subscribe(
      response => {
        if(!response.job){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.job = response.job;
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

  //Funcion al cerrar modal Puestos
  cerrar(){
    if(this.status=="success"){
      this.jobForm.reset();
      this.status="";
    }
  }

}
