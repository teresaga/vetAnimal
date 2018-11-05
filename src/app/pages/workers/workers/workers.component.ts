import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  public workers: Worker[];
  public token;
  public busqueda;

  constructor(
    private _workerService: WorkerService,
    private _userService: UserService
  ){
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getWorkers();
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
