import { Component, OnInit, Input } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker';

@Component({
  selector: 'app-detailsworker',
  templateUrl: './detailsworker.component.html',
  styleUrls: ['./detailsworker.component.css']
})
export class DetailsworkerComponent implements OnInit {
  @Input() id:string;
  @Input() name:string;
  @Input() paternal_surname:string;
  @Input() maternal_surname:string;
  @Input() tel:string;
  @Input() address:string;
  @Input() age:number;
  @Input() email:string;
  @Input() salary:string;
  @Input() job:string;
  @Input() entry_horary:string;
  @Input() departure_horary:string;
  constructor() { }

  ngOnInit() {
  }

}
