import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder

  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.userForm = this.pf.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_check: ['', Validators.required],
      worker: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

}
