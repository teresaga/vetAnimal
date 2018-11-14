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

  //Variables para paginacion
  pag: number = 0;
  totalRegistros: number = 0;

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

}
