import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  clientForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.clientForm = this.pf.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

}
