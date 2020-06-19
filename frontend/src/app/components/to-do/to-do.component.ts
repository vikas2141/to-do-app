import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  @Input() isCreate: boolean;
  @Input() isEdit: boolean;

  todoForm: FormGroup;
  todoData: any;
  id: any;



  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _todoService: ToDoService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('this is the iscreate and isedit', this.isCreate, this.isEdit)
    this.createForm();
    if (!this.isCreate) {
      this.getIdByURL();
    }
  }

  createForm() {
    this.todoForm = this.fb.group({
      name: ["", [Validators.required]],
      discription: ["", [Validators.required]]
    })
  }

  onSubmit() {
    let formValue = this.todoForm.getRawValue()
    this.isCreate ? this.createToDo(formValue) : this.editToDo(formValue);

  }
  getIdByURL() {
    this._activatedRoute.params.subscribe(data => {
      console.log('this is the data:', data)
      this.id = data.id;
      this.getToDo(this.id)
    })
  }
  onEditClick() {
    this._router.navigate(['edit', this.id])// todo/edit/345
  }
  getToDo(id) {
    this._todoService.getToDo(id).subscribe(data => {
      this.todoData = data;
      this.todoForm.patchValue(this.todoData)
      console.log('this is the data:', data)
    })
  }

  createToDo(formValue) {
    this._todoService.createTodo(formValue).subscribe(data => {
      console.log('this is the data:', data)
      this._router.navigate(['home'])
    }, err => {
      console.log('this is the err:', err)
    })
  }

  editToDo(formValue) {
    formValue['id'] = this.id;
    this._todoService.editToDo(formValue).subscribe(data => {
      console.log('this is the data:', data)
      this._router.navigate(['home'])
    }, err => {
      console.log('this is the err:', err)
    })
  }

  get getNamValue() {
    return this.todoForm.get('name')
  }

}
