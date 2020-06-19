import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  formArrays: any[] = [];
  isUsernameOrPasswordInCorrect: boolean;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _todoService: ToDoService
  ) { }

  ngOnInit() {  

    this.loginForm = this.fb.group({
      emailId: "",
      password: ""
    })
  }
  onSubmit() {
    let formValue = this.loginForm.getRawValue();
    this._userService.getLogin(formValue).subscribe(data => {
      localStorage.setItem('user', data['token']);
      console.log('this is the data of the login:', data)
      this.isUsernameOrPasswordInCorrect = false;
      this._todoService.setIsloggedInStatus(true)
      this._router.navigate(['home']);
    }, err => {
      console.log('this is the error of the login:', err)
      this.isUsernameOrPasswordInCorrect = true;
    })

  }

}
