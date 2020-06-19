import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() isCreate: boolean;
  @Input() isEdit: boolean;

  userForm: FormGroup;
  userData: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    if (!this.isCreate) {
      this.getIdByURL();
    }
  }

  createForm() {
    this.userForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      gender: ["male", [Validators.required]]
    })
  }

  onSubmit(event) {
    let formValue = this.userForm.getRawValue();
    console.log('this is the formvalue:', formValue);
    if (this.isCreate) {
      this.createUser(formValue)
    } else {
      this.editUser(formValue);
    }
  }

  getIdByURL() {
    this._activatedRoute.params.subscribe(data => {
      console.log('this is the data:', data);
      this.id = data.id;
      this.getUser(this.id);
    })
  }

  onEditClick() {
    this._router.navigate(['users', 'edit', this.id])
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(data => {
      this.userData = data;
      this.userForm.patchValue(this.userData);
      console.log('this is the data:', data)
    })
  }

  createUser(formValue) {
    this._userService.createUser(formValue).subscribe(data => {
      console.log('this is the data:', data)
    }, err => {
      console.log('this is the err:', err)
    })
  }

  editUser(formValue) {
    formValue['id'] = this.id;
    this._userService.editUser(formValue).subscribe(data => {
      console.log('this is the data:', data)
    }, err => {
      console.log('this is the err:', err)
    })
  }

}
