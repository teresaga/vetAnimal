import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GLOBAL } from '../../../services/global';
import { Job } from '../../../models/job';
import { JobService } from '../../../services/job.service';
import { UserService } from '../../../services/user.service';
import { AddworkerComponent } from '../../workers/addworker/addworker.component';
import { EditworkerComponent } from '../../workers/editworker/editworker.component';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  jobForm: FormGroup;
  public job: Job;
  public url: string;
  public token;
  public status: string;


  constructor(
    private pf: FormBuilder,
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService,
    private _jobService: JobService
  ) { 
    this.job = new Job('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    //console.log(this._router.url);
    this.jobForm = this.pf.group({
      name: ['', Validators.required]
    });
  }

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

    //$("#job").append( "<option>"+this.job.name+"</option>" );
    
  }

  cerrar(){
    if(this.status=="success"){
      this.jobForm.reset();
      //this._workerComponent.getJobsA();
      this.status="";
    }
  }

}
