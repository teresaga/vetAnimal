import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Typeproduct } from '../../../models/typeproduct';
import { TypeproductService } from '../../../services/typeproduct.service';
import { Measurementunit } from '../../../models/measurementunit';
import { MeasurementunitService } from '../../../services/measurementunit.service';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';


import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //Para form y registrar producto
  productForm: FormGroup;
  public product: Product;
  public status: string;
  public status2: string;
  public id: string;

  //token
  public url: string;
  public token;

  //Arreglos para selects
  public typeproducts: Typeproduct[];
  public measurementunits: Measurementunit[];
  public providers: Provider[];

  //Variables para mostrar productos y realizar paginacion
  public products: Product[];
  public busqueda;
  pag: number = 0;
  totalRegistros: number = 0;

  //Registrar unidad de medida
  unitForm: FormGroup;
  measurementunit: Measurementunit;
  
  constructor(
    private pf: FormBuilder,
    private modalService: NgbModal,
    private _userService: UserService,
    private _typeproductService: TypeproductService,
    private _measurementunitService: MeasurementunitService,
    private _providerService: ProviderService,
    private _productService: ProductService
  ) { 
    this.product = new Product('','','','','','','','','','','','','');
    this.measurementunit = new Measurementunit('','','','','');
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.status = "";
    this.status2 = "";
  }

  ngOnInit() {
    this.getTypeproductsA();
    this.getMeasurementunitsA();
    this.getProvidersA();
    this.getProducts();

    this.productForm = this.pf.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      cost: [''],
      provider: [''],
      measurementunit: [''],
      typeproduct: ['', Validators.required],
      stock_min: [''],
      stock_max: [''],
      stock: ['']
    });
    this.unitForm = this.pf.group({
      name: ['', Validators.required]
    });
    this.servicio();
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.productForm.reset();
      }
    });
    this.productForm.reset();
  }

  openModaledit(content, product: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status=='success'){
        this.status='';
        this.productForm.reset();
      }
    });
    this.product._id = product._id;
    this.productForm.get('description').setValue(product.description);
    this.productForm.get('price').setValue(product.price);
    this.productForm.get('cost').setValue(product.cost);
    if(product.provider){
      this.productForm.get('provider').setValue(product.provider._id);
    }
    if(product.measurementunit){
      this.productForm.get('measurementunit').setValue(product.measurementunit._id);
    }
    if(product.typeproduct){
      this.productForm.get('typeproduct').setValue(product.typeproduct._id);
    }
    this.productForm.get('stock_min').setValue(product.stock_min);
    this.productForm.get('stock_max').setValue(product.stock_max);
    this.productForm.get('stock').setValue(product.stock);

  }

  openModalStatus(content, product: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='Deactivate'){
        this.deactivateProduct(product);
      }
      if(result=='Activate'){
        this.activateProduct(product);
      }
    }, (reason) => {
    });
    this.product.description = product.description;
  }

  openModalunit(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      
    }, (reason) => {
      if(this.status2=='success'){
        this.status2='';
        this.unitForm.reset();
      }
    });
  }
  ////////////////////////////////////////////////////////////
  //                   AGREGAR PRODUCTO                     //
  ////////////////////////////////////////////////////////////
  onSubmitAddProduct(){
    this.product.description = this.productForm.get('description').value;
    this.product.price = this.productForm.get('price').value;
    this.product.cost = this.productForm.get('cost').value;
    this.product.provider = this.productForm.get('provider').value;
    this.product.measurementunit = this.productForm.get('measurementunit').value;
    this.product.typeproduct = this.productForm.get('typeproduct').value;
    this.product.stock_min = this.productForm.get('stock_min').value;
    this.product.stock_max = this.productForm.get('stock_max').value;
    this.product.stock = this.productForm.get('stock').value;

    this._productService.addProduct(this.token, this.product).subscribe(
      response => {
        if(!response.product){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.product = response.product;
          this.getProducts();
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

  ////////////////////////////////////////////////////////////
  //                   EDITAR PRODUCTO                      //
  ////////////////////////////////////////////////////////////
  onSubmitEditProduct(){
    this.product.description = this.productForm.get('description').value;
    this.product.price = this.productForm.get('price').value;
    this.product.cost = this.productForm.get('cost').value;
    this.product.provider =  this.productForm.get('provider').value;   
    this.product.measurementunit = this.productForm.get('measurementunit').value;
    this.product.typeproduct = this.productForm.get('typeproduct').value;
    this.product.stock_min = this.productForm.get('stock_min').value;
    this.product.stock_max = this.productForm.get('stock_max').value;
    this.product.stock = this.productForm.get('stock').value;
    this._productService.editProduct(this.token, this.product._id, this.product).subscribe(
      response => {
        if(!response.product){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.product = response.product;
          this.getProducts();
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

  ////////////////////////////////////////////////////////////
  //             CAMBIAR ESTADO DE PRODUCTO                 //
  ////////////////////////////////////////////////////////////
  deactivateProduct(product : Product){
    this._productService.deactivateProduct(this.token, product._id).subscribe(
      response => {
        if(!response.product){
          console.log("Error en el servidor");
        }
        this.getProducts();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  activateProduct(product : Product){
    this._productService.activateProduct(this.token, product._id).subscribe(
      response => {
        if(!response.product){
          console.log("Error en el servidor");
        }
        this.getProducts();
      },error  => {
        console.log("Error en el servidor");
      }
    );
  }

  ////////////////////////////////////////////////////////////
  //             OBTENER REGISTROS PARA SELECTS             //
  ////////////////////////////////////////////////////////////
  //Obtener registros de Unidades de Medida
  getMeasurementunitsA(){
    this._measurementunitService.getMeasurementunitsA().subscribe(
      response => {
        
        if(response.measurementunits){
          this.measurementunits = response.measurementunits;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  //Obtener registros de Tipos de productos
  getTypeproductsA(){
    this._typeproductService.getTypeproductsA().subscribe(
      response => {
        
        if(response.typeproducts){
          this.typeproducts = response.typeproducts;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  //Obtener registros de Proveedores
  getProvidersA(){
    this._providerService.getProvidersA(this.token).subscribe(
      response => {
        
        if(response.providers){
          this.providers = response.providers;
        }
      }, error => {
        console.log(<any>error);
      } 
      
    );
  }

  //Registrar Unidad de medida
  onSubmitAddUnit(){
    this.measurementunit.name = this.unitForm.get('name').value;

    this._measurementunitService.addMeasurementunit(this.token, this.measurementunit).subscribe(
      response => {
        if(!response.measurementunit){
          this.status2 = 'error';
        }else{
          this.status2 = 'success';
          this.measurementunit = response.measurementunit;
          this.getMeasurementunitsA();
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
  ////////////////////////////////////////////////////////////
  //         OBTENER PRODUCTOS Y REALIZAR PAGINACION        //
  ////////////////////////////////////////////////////////////
  getProducts(){
    this._productService.getProducts(this.token, this.pag).subscribe(
      response => {
        
        if(response.products){
          this.products = response.products;
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
    this.getProducts();
  }

  servicio(): void{
    this.productForm.get('typeproduct').valueChanges.subscribe(valor=>{
      var typeproduct = this.productForm.get('typeproduct').value;
      if(typeproduct=='5bebc3eb3cf30da624b4229a'){
        this.productForm.get('provider').reset();
        this.productForm.get('measurementunit').reset();
        this.productForm.get('stock_min').reset();
        this.productForm.get('stock_max').reset();
        this.productForm.get('stock').reset();
        this.productForm.get('cost').reset();
      }
    });
  }
}
