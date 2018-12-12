import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Corte } from '../../../models/corte';
import { CorteService } from '../../../services/corte.service';

import { Sale } from 'src/app/models/sale';
import { Saledetails } from 'src/app/models/saledetails';
import { SaleService } from '../../../services/sale.service';
import { Observable } from 'rxjs';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  @ViewChild('information') modalInfo: Element;
  @ViewChild('information2') modalInfo2: Element;
  @ViewChild('information3') modalInfo3: Element;
  @ViewChild('information4') modalInfo4: Element;
  @ViewChild('confirmar') modalConfirmar: Element;

  //Variables para realizar busquedas
  corteForm: FormGroup;
  public fechaactual = null;
  public sale: Sale;
  public saledetail: Saledetails;
  public product: Product;
  public corte: Corte;
  public corte2: Corte;
  public status: string;
  public status2: string;
  public id: string;
  public busqueda2;
  public busqueda3;

  //token
  public url: string;
  public token;
  public identity;

  //Arrays para mostrar en select y los productos en la tabla
  public products: Product[];
  public clients: Client[];
  public saledetails: Array<Saledetails> = [];
  
  public salesCorte: Array<Sale> = [];//PARA OBTENER VENTAS

  //Producto seleccionado en el select de busqueda
  public seleccionProducto = null;
  public seleccionCliente = null;
  public NombreProducto = null;

  //Variable para mostrar el total del producto
  public corteGanancias = 0;
  public totalVenta = 0;
  public cambio = 0;
  public importeVenta = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _clientService: ClientService,
    private _corteService: CorteService,
    private _userService: UserService,
    private _productService: ProductService,
    private _saleService: SaleService,
  ) { 
    this.sale = new Sale('','','','');
    this.saledetail =  new Saledetails('','','','','','','','');
    this.product = new Product('','','','','','','','','','','','','');
    this.corte = new Corte('','','','','','','');
    this.corte2 = new Corte('','','','','','','');
    this.token = this._userService.getToken();
    this.identity= this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.status = "";
    this.status2 = "";
    
  }

  ngOnInit() {
    this.getProductsA();
    this.getClientsA();
    this.corteForm = this.pf.group({
      money_save: ['', Validators.required]
    });
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.corteForm.reset();
      }
    });
    this.getSales();
  }


  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
    }, (reason) => {
    });
    this.status="";
  }

  openModalBusqueda(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onSubmitAddSale(){
    this.NombreProducto="";
    var ventaValida = "";
    for (let detail2 of this.saledetails) {
      if(detail2.stock!="null"){ 
        var stockintermedio:number = +detail2.stock- +detail2.quantity; 
        if(stockintermedio < 0 && ventaValida==""){
          ventaValida = "f";
          this.NombreProducto=detail2.name;
        }
      }
    }
    if(ventaValida==""){
      this.sale.amount = (this.totalVenta).toString();
      this.sale.client = this.seleccionCliente;

      this._saleService.addSale(this.token, this.sale).subscribe(
        response => {
          if(!response.sale){
            this.status = 'error';
          }else{
            this.status = 'success';
            this.sale = response.sale;

            this.saledetail.sale=this.sale._id;
            for (let detail of this.saledetails) {
              this.saledetail.product=detail.product;
              this.saledetail.price=detail.price;
              this.saledetail.quantity=detail.quantity;
              this._saleService.addSaleDetails(this.token, this.saledetail).subscribe(
                response => {
                  if(!response.saledetail){
                    this.status = 'error';
                  }else{
                    this.status = 'success';
                    this.saledetail = response.saledetail;
                    this.cancelarVenta();
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  if (errorMessage != null){
                    this.status = 'error';
                  }
                }
              );
              //VERIFICA SI EL PRODUCTO NO ES UN SERVICIO Y ACTUALIZA SU STOCK
              if(detail.stock!="null"){
                var stockActual= +detail.stock - +detail.quantity;
                this._productService.changeStockProduct(this.token, detail.product, stockActual).subscribe(
                  response => {
                    if(!response.product){
                    }else{
                      this.getProductsA();
                    }
                  },
                  error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null){
                    }
                  }
                );
              }
              //AGREGAR CORTE DE CAJA
              this._corteService.getUltimoCorte(this.token).subscribe(
                response => {
                  if(response.corte){
                    this.corte = response.corte;

                    if(this.corte.status=='T'){
                      this._corteService.addCorte(this.token, this.corte).subscribe();
                    }
                  }else{
                    this._corteService.addCorte(this.token, this.corte).subscribe();
                  }
                }, error => {
                  console.log(<any>error);
                } 
              );
              
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null){
            this.status = 'error';
          }
        }
      );
    }else{
      this.modalService.dismissAll();
      this.openModalInfo(this.modalInfo3);
    }
    
  }

  onSubmitAddCorte(){
    if (this.corte2.money_sales=="0"){
      this.openModalInfo(this.modalInfo4);
      this.corteForm.reset();
    }else{
      this.corte2.money_save = this.corteForm.get('money_save').value;
      this.corte2.user = this.identity._id;

      this._corteService.editCorte(this.token, this.corte2._id, this.corte2).subscribe(
        response => {
          if(!response.corte){
            this.status2 = 'error';
          }else{
            this.status2 = 'success';
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
  }

  ///////////////////////////////////////////////////////////
  //            AGREGAR PRODUCTOS A LA LISTA               //
  ///////////////////////////////////////////////////////////
  agregarProducto(){
    var banderaEncontro = this.saledetails.find( fruta => fruta.product === this.seleccionProducto);
    if (!banderaEncontro){
      this.getProduct(this.seleccionProducto);
    }else{
      this.openModalInfo(this.modalInfo);
    }
  }

  //Obtener producto
  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response => {
        if(response.product){
          this.product = response.product;

          if(this.product.typeproduct=="5bebc3d03cf30da624b42291" && this.product.stock=="0"){
            this.seleccionProducto="null";
            this.openModalInfo(this.modalInfo2);
          }else{
            var stock;
            if(this.product.typeproduct=="5bebc3d03cf30da624b42291"){
              stock = this.product.stock;
            }else{
              stock = "null";
            }
            this.saledetails.push({_id: '',sale: '', name: this.product.description ,product: this.seleccionProducto, quantity: '1', price: this.product.price, amount: this.product.price, stock: stock});
            this.totalVenta=this.totalVenta + +this.product.price;
          }
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  //Cambiar total del producto
  cambiarTotal(i){
    if(+this.saledetails[i].quantity > 0){
      this.totalVenta=this.totalVenta - +this.saledetails[i].amount;
      var total= +this.saledetails[i].quantity * +this.saledetails[i].price;
      this.saledetails[i].amount= (total).toString();
      this.totalVenta=this.totalVenta + +this.saledetails[i].amount;
    }else{
      this.saledetails[i].quantity = "1";
    }
  }

  eliminarProducto(i){
    this.saledetails.splice(i,1); 
    if(this.saledetails.length==0){
      this.cancelarVenta();
    }
  }

  ///////////////////////////////////////////////////////////
  //           MOSTRAR CAMBIO PARA DAR A CLIENTE           //
  ///////////////////////////////////////////////////////////
  cambiarCambioVenta(){
    if(+this.importeVenta>=0){
      this.cambio=this.importeVenta-this.totalVenta;
    }
  }
  ///////////////////////////////////////////////////////////
  //                    CANCELAR VENTA                     //
  ///////////////////////////////////////////////////////////
  cancelarVenta(){
    this.seleccionProducto="null";
    this.seleccionCliente="null";
    this.totalVenta=0;
    this.importeVenta=0;
    this.cambio=0;
    this.saledetails.splice(0,this.saledetails.length);
  }
  ///////////////////////////////////////////////////////////
  //                      BUSQUEDAS                         //
  ///////////////////////////////////////////////////////////
  //Obtener registros de Productos
  getProductsA(){
    this._productService.getProductsA(this.token).subscribe(
      response => {
        if(response.products){
          this.products = response.products;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener registros de Clientes activos
  getClientsA(){
    this._clientService.getClientsA(this.token).subscribe(
      response => {
        if(response.clients){
          this.clients = response.clients;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
    
  }

  //Obtener registros de ventas y obtiene la ganancia de las ventas
  getSales(){
    this.corteGanancias = 0;
    var date = new Date();
    this.fechaactual=date.toISOString();
    
    this._corteService.getUltimoCorte(this.token).subscribe(
      response => {
        if(response.corte){
          this.corte2 = response.corte;

          if(this.corte2.status=='T'){
            this.corte2 = new Corte('','','','','','','','');
            this.corte2.money_sales = "0";
          }else{
            this._saleService.getSalesSinLimite(this.token, this.corte2.start_date, this.fechaactual).subscribe(
              response => {
                if(response.sales){
                  this.salesCorte = response.sales;
                  for (let sale of this.salesCorte) {
                    this.corteGanancias = this.corteGanancias + +sale.amount;
                  }

                  //PONER GANANCIAS
                  this.corte2.money_sales = this.corteGanancias.toString();
                }
              }, error => {
                console.log(<any>error);
              } 
              
            );
          }
        }else{
          
          this.corte2 = new Corte('','','','','','','','');
          this.corte2.money_sales = "0";
        }
      }, error => {
        console.log(<any>error);
      }
    );
    
  }


}
