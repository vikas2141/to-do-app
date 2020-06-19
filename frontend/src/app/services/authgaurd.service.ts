import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToDoService } from './to-do.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {

  constructor(private _router: Router, private _todoService: ToDoService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('user')) {
      this._todoService.setIsloggedInStatus(true)
      return true
    }
    else {
      this._todoService.setIsloggedInStatus(false)
      this._router.navigate(['login'])
      return false;
    }
  }

}
