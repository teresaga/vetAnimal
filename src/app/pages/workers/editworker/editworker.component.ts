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

@Component({
  selector: 'app-editworker',
  templateUrl: './editworker.component.html',
  styleUrls: ['./editworker.component.css']
})
export class EditworkerComponent implements OnInit {
  @Input() nom:string;
  public worker: Worker;
  public jobs: Job[];
  public url: string;
  public token;
  public status: string;
  workerForm: FormGroup;

  constructor(
    private pf: FormBuilder,
    private _jobService: JobService,
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService,
    private _workerService: WorkerService,
    private _workerComponent: WorkersComponent
  ) {
    this.worker = new Worker('','','','','','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.workerForm = this.pf.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: [''],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      job: ['', Validators.required],
      departure_horary: ['', Validators.required],
      entry_horary: ['', Validators.required]
    });
    this.getJobsA();
  }

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

  cerrar(){
    if(this.status=="success"){
      this.workerForm.reset();
      this._workerComponent.getWorkers();
      this.status="";
    }
  }
}
