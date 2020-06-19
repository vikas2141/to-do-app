import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: any;


  constructor(private _router: Router, private _todoService: ToDoService) {
    this.todoList = [];
  }

  ngOnInit() {
    this.getAllToDo();
    let username = this.setUserName();
    username();
  }

  setUserName() {
    let firstName = 'Akash';
    let lastName = 'Gupta'
    return () => console.log(firstName + ' ' + lastName)
  }

  getAllToDo() {
    this._todoService.getAllTodo().subscribe(data => {
      this.todoList = data;
    })
  }

  onNewToDoClick() {
    this._router.navigate(['create'])
  }
  viewSubmit(id) {
    this._router.navigate(['view', id])
  }
  onDelClick(id) {
    this._todoService.delToDo(id).subscribe(data => {
      this.todoList = this.todoList.filter(todo => {
        if (!(todo.id == id))
          return todo
      });

      console.log('this is the data:', data);
    })
  }

}
