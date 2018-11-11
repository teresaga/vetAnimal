import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GLOBAL } from '../../../services/global';
import { Job } from '../../../models/job';
import { JobService } from '../../../services/job.service';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';
import { UserService } from '../../../services/user.service';
import { WorkersComponent } from '../workers/workers.component';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-editworker',
  templateUrl: './editworker.component.html',
  styleUrls: ['./editworker.component.css']
})
export class EditworkerComponent implements OnInit {
  @Input() id:string;
  @Input() name:string;
  @Input() paternal_surname:string;
  @Input() maternal_surname:string;
  @Input() tel:string;
  @Input() address:string;
  @Input() age:number;
  @Input() email:string;
  @Input() salary:string;
  @Input() job:string;
  @Input() entry_horary:string;
  @Input() departure_horary:string;
  worker: Worker;
  public jobs: Job[];
  public url: string;
  public token;
  public status: string;

  constructor(
    private pf: FormBuilder,
    private _jobService: JobService,
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService,
    private _workerService: WorkerService,
    private _workerComponent: WorkersComponent
  ) {
    this.worker = new Worker('','','','','','',0,'','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.getJobsA();
    this.worker._id=this.id;
    this.worker.name=this.name;
    this.worker.paternal_surname=this.paternal_surname;
    this.worker.maternal_surname=this.maternal_surname;
    this.worker.address=this.address;
    this.worker.age=this.age;
    this.worker.tel=this.tel;
    this.worker.salary=this.salary;
    this.worker.job=this.job;
    this.worker.email=this.email;
    this.worker.entry_horary=this.entry_horary;
    this.worker.departure_horary=this.departure_horary;
  }

  onSubmit(){
    this.name=this.worker.name;
    this.paternal_surname=this.worker.paternal_surname;
    this.maternal_surname=this.worker.maternal_surname;
    this.address=this.worker.address;
    this.age=this.worker.age;
    this.tel=this.worker.tel;
    this.salary=this.worker.salary;
    this.job=this.worker.job;
    this.email=this.worker.email;
    this.entry_horary=this.worker.entry_horary;
    this.departure_horary=this.worker.departure_horary;
    this._workerService.editWorker(this.token, this.worker._id, this.worker).subscribe(
      response => {
        if(!response.worker){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.worker = response.worker;
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

  public getJobsA(){
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

  cerrar(){
    if(this.status=="success"){
      this._workerComponent.getWorkers();
      this.status="";
    }
  }
}
