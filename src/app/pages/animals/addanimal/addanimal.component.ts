import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addanimal',
  templateUrl: './addanimal.component.html',
  styleUrls: ['./addanimal.component.css']
})
export class AddanimalComponent implements OnInit {
  animalForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.animalForm = this.pf.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      sex: ['', Validators.required],
      birthdate: ['', Validators.required],
      specie: ['', Validators.required],
      race: ['', Validators.required],
      character: ['', Validators.required],
      hair: ['', Validators.required],
      habitat: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      sterilized: ['', Validators.required],
      nails: ['', Validators.required],
      notes: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

}
