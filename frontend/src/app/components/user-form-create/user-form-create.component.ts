import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form-create',
  templateUrl: './user-form-create.component.html',
  styleUrls: ['./user-form-create.component.css']
})
export class UserFormCreateComponent implements OnInit {
  isCreate = true;
  constructor() { }

  ngOnInit() {
  }

}
