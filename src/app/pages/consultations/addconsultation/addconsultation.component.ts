import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addconsultation',
  templateUrl: './addconsultation.component.html',
  styleUrls: ['./addconsultation.component.css']
})
export class AddconsultationComponent implements OnInit {
  consultationForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.consultationForm = this.pf.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      animal: ['', Validators.required],
      weight: ['', Validators.required],
      temperature: ['', Validators.required],
      notes: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

}
