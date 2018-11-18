import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingForm: FormGroup;
  public status: string;

  constructor(
    private pf: FormBuilder
  ) { 
    this.status = "";
  }

  ngOnInit() {
    this.settingForm = this.pf.group({
      password_actual: ['', Validators.required],
      password_new: ['', Validators.required],
      password_check: ['', Validators.required]
    });
  }

}
