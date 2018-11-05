import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public token;
  public url: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService){
    this.title = 'NGZOO';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  /*PRUEBA DE JQUERY
  public prueba(){
    $(".header").css("background","red");
  }*/
}
