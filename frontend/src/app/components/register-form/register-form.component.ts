import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  formArrays: any[]=[];
  isEmailidAlreadyExist: boolean;

  constructor(
    private fb:FormBuilder,
    private _router: Router,
    private _userService: UserService
    
    ) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      firstName:"",
      lastName:"",
      emailId:"",
      createPassword:""
    })

  };

  onSubmit() {
    let formValue=this.registerForm.getRawValue();
    this._userService.getRegister(formValue).subscribe(data=>{
      console.log("this is the data of the register:",data);
      this.isEmailidAlreadyExist=false;
      this._router.navigate(['home']);
    },err=>{
      console.log("this is the err:",err);
      this.isEmailidAlreadyExist=true;
    })
    
    


  };

}
