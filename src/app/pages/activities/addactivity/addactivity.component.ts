import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  activityForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.activityForm = this.pf.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      service: ['', Validators.required],
      client: ['', Validators.required],
      animal: ['', Validators.required],
      worker: ['', [Validators.required, Validators.email]],
      notes: ['', Validators.required]
    });
  }

  onSubmit(){

  }
  
  cerrar(){

  }

}
