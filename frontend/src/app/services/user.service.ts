import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  getUser(id) {
    let URL = "http://localhost:3000/users/" + id;
    return this._http.get(URL)
  }

  createUser(body) {
    let URL = "http://localhost:3000/users";
    return this._http.post(URL, body)
  }

  editUser(body) {
    let URL = "http://localhost:3000/users";
    return this._http.put(URL, body)
  }

  getLogin(body){
    let URL="http://localhost:5555/login";
    return this._http.post(URL,body)
  }

  getRegister(body) {
    let URL="http://localhost:5555/register";
    return this._http.post(URL,body)
  }
}
