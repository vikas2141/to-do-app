import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/services/to-do.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  isLoggedIn: boolean;
  id: any;

  constructor(
    private _router: Router,
    private _todoService: ToDoService
  ) { }

  ngOnInit() {
    this.getLoggedInStatus();
    this.onDecode();
  }
  getLoggedInStatus() {
    this._todoService.getIsLoggedInStatus().subscribe(data => {
    this.isLoggedIn = data;
    })
  }
  onLogoutClick(event) {
    localStorage.clear();
    this._todoService.setIsloggedInStatus(false);
    this._router.navigate(['login'])
  }
  onDecode() {
    var token = localStorage.getItem('user');
    this.user = jwt_decode(token);
  }
}
