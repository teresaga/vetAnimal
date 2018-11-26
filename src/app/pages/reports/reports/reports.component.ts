import { Component, OnInit , ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

import { Tables } from 'src/app/models/tables';
import { Sale } from 'src/app/models/sale';
import { Saledetails } from 'src/app/models/saledetails';
import { SaleService } from '../../../services/sale.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('information') modalInfo: Element;

  //token
  public url: string;
  public token;

  public tipoReporte = "1";
  public busquedaFechaDe = null;
  public busquedaFechaHasta = null;

  public saledetails: Saledetails[];
  public sales: Sale[];
  public clients: Client[];
  public products: Product[];
  public tabledetailsClient: Array<Tables> = [];
  public tabledetailsProduct: Array<Tables> = [];

  //Para paginacion
  pag: number = 0;
  totalRegistros: number = 0;

  constructor(
    private modalService: NgbModal,
    private _clientService: ClientService,
    private _userService: UserService,
    private _productService: ProductService,
    private _saleService: SaleService,

  ) { 
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    var date = new Date();
    this.busquedaFechaDe=date.toISOString().slice(0,10);
    this.busquedaFechaHasta=date.toISOString().slice(0,10);
  }

  ngOnInit() {
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  openModaldetails(content, id: string){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    this.getSaleDetails(id);
  }

  realizarReporte(){
    if(this.tipoReporte=="1"){
      this.getSales();
    }
    if(this.tipoReporte=="2"){
      this.tabledetailsClient.splice(0,this.tabledetailsClient.length);
      this.getClients();
    }
    if(this.tipoReporte=="3"){
      this.tabledetailsProduct.splice(0,this.tabledetailsProduct.length);
      this.getProducts();
    }
  }

  changeReport(){
    this.pag=0; 
    this.totalRegistros= 0;
    this.tabledetailsProduct.splice(0,this.tabledetailsProduct.length);
    this.tabledetailsClient.splice(0,this.tabledetailsClient.length);
    this.sales=[];

  }
  ////////////////////////////////////////////
  //    REPORTE DE VENTAS POR PRODUCTO      //
  ////////////////////////////////////////////
  //Obtener registros de Productos
  getProducts(){
    this._productService.getProducts(this.token, this.pag).subscribe(
      response => {
        if(response.products){
          this.products = response.products;
          for (let product of this.products) {
              this.getSaleProduct(product);
          }
          
        this.totalRegistros = response.total;
        }
        
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener numero de ventas por cada producto
  getSaleProduct(product: any){
    this._saleService.getSaleDetailsProduct(this.token, product._id).subscribe(
      response => {
        var total=0;
        if(response.total){
          this.saledetails = response.saledetails;
          for (let product of this.saledetails) {
            total = total + +product.quantity;
          }
          this.tabledetailsProduct.push({client: product.description , quantity: total.toString()});
        }
        if(response.total==0){
          this.tabledetailsProduct.push({client: product.description , quantity: "0"});
         }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  ////////////////////////////////////////////
  //    REPORTE DE VENTAS POR CLIENTE       //
  ////////////////////////////////////////////
  //Obtener registros de Clientes
  getClients(){
    this._clientService.getClients(this.token, this.pag).subscribe(
      response => {
        if(response.clients){
          this.clients = response.clients;
          this.totalRegistros = response.total;
          for (let client of this.clients) {
              this.getSaleClient(client);
          }
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener numero de ventas por cada cliente
  getSaleClient(client: any){
    this._saleService.getSaleClient(this.token, client._id, this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
      response => {
        if(response.total){
          this.tabledetailsClient.push({client: client.name + " " + client.paternal_surname  , quantity: response.total});
        }
        if(response.total==0){
          this.tabledetailsClient.push({client: client.name + " " + client.paternal_surname  , quantity: "0"});
         }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }
  ////////////////////////////////////////////
  //            REPORTE DE VENTAS           //
  ////////////////////////////////////////////
  //Obtener registros de ventas
  getSales(){
    this._saleService.getSales(this.token,this.pag,this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(
      response => {
        if(response.sales){
          this.sales = response.sales;
          this.totalRegistros = response.total;
          if(this.totalRegistros==0){
            this.openModalInfo(this.modalInfo);
          }
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener registros de detalle de venta
  getSaleDetails(id){
    this._saleService.getSaleDetails(this.token, id).subscribe(
      response => {
        if(response.saledetails){
          this.saledetails = response.saledetails;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  ////////////////////////////////////////////
  //               PAGINACION               //
  ////////////////////////////////////////////
  cambiarPag( valor: number){
    let pag = this.pag + valor;

    if( pag >= this.totalRegistros){
      return;
    }
    if ( pag < 0 ){
      return;
    }

    this.pag += valor;
    this.realizarReporte();
  }
}
