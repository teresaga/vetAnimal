import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.productForm = this.pf.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      cost: [''],
      provider: ['', Validators.required],
      measurementunit: [''],
      typeproduct: ['', Validators.required],
      stock_min: [''],
      stock_max: ['']
    });
  }

}
