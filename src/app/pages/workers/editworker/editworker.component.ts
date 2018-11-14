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
    this.worker = new Worker('','','','','','',0,'','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
   
  }

  ngOnInit() {
    this.getJobsA();
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
    this.worker._id=this.id;
    this.workerForm.get('name').setValue(this.name);
    this.workerForm.get('paternal_surname').setValue(this.paternal_surname);
    this.workerForm.get('maternal_surname').setValue(this.maternal_surname);
    this.workerForm.get('email').setValue(this.email);
    this.workerForm.get('tel').setValue(this.tel);
    this.workerForm.get('address').setValue(this.address);
    this.workerForm.get('age').setValue(this.age);
    this.workerForm.get('entry_horary').setValue(this.entry_horary);
    this.workerForm.get('departure_horary').setValue(this.departure_horary);
    this.workerForm.get('salary').setValue(this.salary);
    this.workerForm.get('job').setValue(this.job);
  }

  onSubmit(){
    this.worker.name = this.workerForm.get('name').value;
    this.worker.paternal_surname = this.workerForm.get('paternal_surname').value;
    this.worker.maternal_surname = this.workerForm.get('maternal_surname').value;
    this.worker.email = this.workerForm.get('email').value;
    this.worker.tel = this.workerForm.get('tel').value;
    this.worker.address = this.workerForm.get('address').value;
    this.worker.age = this.workerForm.get('age').value;
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
      this._workerComponent.getWorkers();
      this.status="";
    }
  }
}
