import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

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
  @ViewChild('confirmar') modalConfirmar: Element;

  //Variables para realizar busquedas
  public sale: Sale;
  public saledetail: Saledetails;
  public product: Product;
  public status: string;
  public id: string;

  //token
  public url: string;
  public token;

  //Arrays para mostrar en select y los productos en la tabla
  public products: Product[];
  public clients: Client[];
  public saledetails: Array<Saledetails> = [];

  //Producto seleccionado en el select de busqueda
  public seleccionProducto = null;
  public seleccionCliente = null;
  public NombreProducto = null;

  //Variable para mostrar el total del producto
  public totalVenta = 0;
  public cambio = 0;
  public importeVenta = 0;

  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _clientService: ClientService,
    private _userService: UserService,
    private _productService: ProductService,
    private _saleService: SaleService,
  ) { 
    this.sale = new Sale('','','','');
    this.saledetail =  new Saledetails('','','','','','','','');
    this.product = new Product('','','','','','','','','','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
  }

  ngOnInit() {
    this.getProductsA();
    this.getClientsA();
  }

  openModalInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
    }, (reason) => {
    });
    this.status="";
  }

  onSubmitAddSale(){
    this.NombreProducto="";
    var ventaValida = "";
    for (let detail2 of this.saledetails) {
      if(detail2.stock!="null"){ console.log("hola");
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
      console.log(this.seleccionCliente);
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
  //                BUSQUEDA DE PRODUCTOS                  //
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
}
