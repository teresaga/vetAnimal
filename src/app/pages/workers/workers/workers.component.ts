import { Component, OnInit } from '@angular/core';
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
  public jobs: Job[];
  public url: string;

  public workers: Worker[];
  public token;
  public busqueda;

  constructor(
    private _workerService: WorkerService,
    private _userService: UserService,
    private _jobService: JobService
  ){
    this.token = this._userService.getToken();
  }
  
  ngOnInit() {
    this.getWorkers();
  }

  deactivateWorker(id){
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
    this._workerService.getWrokers().subscribe(
      response => {
        
        if(response.workers){
          this.workers = response.workers;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

}
