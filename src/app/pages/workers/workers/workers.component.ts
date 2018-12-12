import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';
import { GLOBAL } from '../../../services/global';
import { Job } from '../../../models/job';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  //Para form y registrar producto
  workerForm: FormGroup;
  public worker: Worker;
  public status: string;
  public status2: string;
  public id: string;
  cargando: boolean = true;

  //token
  public url: string;
  public token;

  //Arreglos para selects
  public jobs: Job[];

  //Variables busqueda de empleados y para paginacion
  public workers: Worker[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  //Variables para registrar puestos
  jobForm: FormGroup;
  public job: Job;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _workerService: WorkerService,
    private _userService: UserService,
    private _jobService: JobService
  ){
    this.worker = new Worker('','','','','','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.job = new Job('','','','','');
    this.status = "";
    this.status2 = "";
  }
  
  ngOnInit() {
    this.cargando = false;
    this.getWorkers();
    this.getJobsA();
    this.jobForm = this.pf.group({
      name: ['', Validators.required]
    });
    this.workerForm = this.pf.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: [''],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      job: ['', Validators.required],
      departure_horary: ['', Validators.required],
      entry_horary: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.workerForm.reset();
      }
    });
    this.workerForm.reset();
  }

  openModaledit(content, worker: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.workerForm.reset();
      }
    });
    this.worker._id = worker._id;
    this.workerForm.get('name').setValue(worker.name);
    this.workerForm.get('paternal_surname').setValue(worker.paternal_surname);
    this.workerForm.get('maternal_surname').setValue(worker.maternal_surname);
    this.workerForm.get('email').setValue(worker.email);
    this.workerForm.get('tel').setValue(worker.tel);
    this.workerForm.get('address').setValue(worker.address);
    this.workerForm.get('birthdate').setValue(worker.birthdate);
    this.workerForm.get('entry_horary').setValue(worker.entry_horary);
    this.workerForm.get('departure_horary').setValue(worker.departure_horary);
    this.workerForm.get('salary').setValue(worker.salary);
    this.workerForm.get('job').setValue(worker.job._id);
  }

  openModalStatus(content, worker: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateWorker(worker);
      }
      if(result=='Activate'){
        this.activateWorker(worker);
      }
    }, (reason) => {
    });
    this.worker.name = worker.name;
    this.worker.paternal_surname = worker.paternal_surname;
    this.worker.maternal_surname = worker.maternal_surname;
  }

  openModalJob(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.jobForm.reset();
      }
    });
  }

  openModaldetails(content, worker: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.worker.paternal_surname = worker.paternal_surname;
    this.worker.maternal_surname = worker.maternal_surname;
    this.worker.email = worker.email;
    this.worker.tel = worker.tel;
    this.worker.address = worker.address;
    this.worker.birthdate = worker.birthdate;
    this.worker.entry_horary = worker.entry_horary;
    this.worker.departure_horary= worker.departure_horary;
    this.worker.salary = worker.salary;
    this.worker.job = worker.job.name;
    this.worker.start_date = worker.start_date;
    this.worker.end_date = worker.end_date;
  }
  ////////////////////////////////////////////////////////////
  //                   AGREGAR EMPLEADO                     //
  ////////////////////////////////////////////////////////////
  onSubmitAddWorker(){
    this.worker.name = this.workerForm.get('name').value;
    this.worker.paternal_surname = this.workerForm.get('paternal_surname').value;
    this.worker.maternal_surname = this.workerForm.get('maternal_surname').value;
    this.worker.email = this.workerForm.get('email').value;
    this.worker.tel = this.workerForm.get('tel').value;
    this.worker.address = this.workerForm.get('address').value;
    this.worker.birthdate = this.workerForm.get('birthdate').value;
    this.worker.entry_horary = this.workerForm.get('entry_horary').value;
    this.worker.departure_horary = this.workerForm.get('departure_horary').value;
    this.worker.salary = this.workerForm.get('salary').value;
    this.worker.job = this.workerForm.get('job').value;
    
    this._workerService.addWorker(this.token, this.worker).subscribe(
      response => {
        if(!response.worker){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.worker = response.worker;
          this.getWorkers();
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
  //                   EDITAR EMPLEADO                      //
  ////////////////////////////////////////////////////////////
  onSubmitEditWorker(){
    this.worker.name = this.workerForm.get('name').value;
    this.worker.paternal_surname = this.workerForm.get('paternal_surname').value;
    this.worker.maternal_surname = this.workerForm.get('maternal_surname').value;
    this.worker.email = this.workerForm.get('email').value;
    this.worker.tel = this.workerForm.get('tel').value;
    this.worker.address = this.workerForm.get('address').value;
    this.worker.birthdate = this.workerForm.get('birthdate').value;
    this.worker.entry_horary = this.workerForm.get('entry_horary').value;
    this.worker.departure_horary = this.workerForm.get('departure_horary').value;
    this.worker.salary = this.workerForm.get('salary').value;
    this.worker.job = this.workerForm.get('job').value;
    this._workerService.editWorker(this.token, this.worker._id, this.worker).subscribe(
      response => {
        if(!response.worker){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.worker = response.worker;
          this.getWorkers();
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
  //             CAMBIAR ESTADO DE EMPLEADO                 //
  ////////////////////////////////////////////////////////////
  deactivateWorker(worker : Worker){
    this._workerService.deactivateWorker(this.token, worker._id).subscribe(
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

  activateWorker(worker : Worker){
    this._workerService.activateWorker(this.token, worker._id).subscribe(
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
  ////////////////////////////////////////////////////////////
  //             OBTENER REGISTROS PARA SELECTS             //
  ////////////////////////////////////////////////////////////
  //Obtener registros de puestos
  getJobsA(){
    this._jobService.getJobsA().subscribe(
      response => {
        
        if(response.jobs){
          this.jobs = response.jobs;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  //onSubmit para Puestos
  onSubmitAddJob(){
    this.job.name = this.jobForm.get('name').value;
    
    this._jobService.addJob(this.token, this.job).subscribe(
      response => {
        if(!response.job){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.job = response.job;
          this.getJobsA();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null){
          this.status2 = 'error';
        }
      }
    );
  }
  ////////////////////////////////////////////////////////////
  //         OBTENER EMPLEADOS Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getWorkers(){
    this.cargando = true;
    this._workerService.getWokers(this.token, this.pag).subscribe(
      response => {
        
        if(response.workers){
          this.workers = response.workers;
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
    this.getWorkers();
  }

}
