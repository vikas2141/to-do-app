import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  header: any;
  private _loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.header = {
      Authorization: 'Bearer ' + localStorage.getItem('user')
    }
  }

  getToDo(id) {
    let URL = " http://localhost:5555/todo/" + id;
    return this._http.get(URL, { headers: this.header })
  }

  createTodo(body) {
    let URL = "http://localhost:5555/todo";
    console.log('jwt_decode(localStorage.getItem(user))', jwt_decode(localStorage.getItem('user')))
    body['userid'] = jwt_decode(localStorage.getItem('user')).id
    return this._http.post(URL, body, { headers: this.header })
  }

  editToDo(body) {
    let URL = "http://localhost:5555/todo";
    body['userid'] = jwt_decode(localStorage.getItem('user')).id
    return this._http.put(URL, body,{headers: this.header})
  }

  getAllTodo(): Observable<any> {
    let userid = jwt_decode(localStorage.getItem('user')).id
    let URL = "http://localhost:5555/todo/user/" + userid
    return this._http.get(URL, { headers: this.header })
  }

  delToDo(id) {
    let URL = "http://localhost:5555/todo/" + id;
    return this._http.delete(URL,{ headers: this.header });
  }

  setIsloggedInStatus(status) {
    this._loggedInStatus.next(status)
  }

  getIsLoggedInStatus() {
    return this._loggedInStatus.asObservable();
  }


}
