import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { WorkerService } from '../../services/worker.service';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { AnimalService } from '../../services/animal.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalProvider: number = 0;
  totalProduct: number = 0;
  totalWorker: number = 0;
  totalUser: number = 0;
  totalAnimal: number = 0;
  totalClient: number = 0;
  public identity;
  constructor(
    private _providerService: ProviderService,
    private _productService: ProductService,
    private _workerService: WorkerService,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _clientService: ClientService
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.getWorkers();
    this.getUsers();
    this.getProviders();
    this.getProducts();
    this.getAnimals();
    this.getClients();
  }

  getWorkers(){
    this._workerService.getWorkerCount().subscribe(
      response => {
        if(response.total){
          this.totalWorker = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getUsers(){
    this._userService.getUserCount().subscribe(
      response => {
        if(response.total){
          this.totalUser = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getProducts(){
    this._productService.getProductCount().subscribe(
      response => {
        if(response.total){
          this.totalProduct = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getProviders(){
    this._providerService.getProviderCount().subscribe(
      response => {
        if(response.total){
          this.totalProvider = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getAnimals(){
    this._animalService.getAnimalCount().subscribe(
      response => {
        if(response.total){
          this.totalAnimal = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  getClients(){
    this._clientService.getClientCount().subscribe(
      response => {
        if(response.total){
          this.totalClient = response.total;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
}
