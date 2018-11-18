import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addprovider',
  templateUrl: './addprovider.component.html',
  styleUrls: ['./addprovider.component.css']
})
export class AddproviderComponent implements OnInit {
  providerForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.providerForm = this.pf.group({
      name: ['', Validators.required],
      business_name: ['', Validators.required],
      rfc: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      contact_person: ['', Validators.required],
    });
  }

}
