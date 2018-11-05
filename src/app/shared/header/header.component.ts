import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public identity;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log(this.identity.username);
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['login']);
  }
}
