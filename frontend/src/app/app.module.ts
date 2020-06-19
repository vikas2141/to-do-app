import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormCreateComponent } from './components/user-form-create/user-form-create.component';
import { UserFormEditComponent } from './components/user-form-edit/user-form-edit.component';
import { UserFormViewComponent } from './components/user-form-view/user-form-view.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { TodoFormCreateComponent } from './components/todo-form-create/todo-form-create.component';
import { TodoFormEditComponent } from './components/todo-form-edit/todo-form-edit.component';
import { TodoFormViewComponent } from './components/todo-form-view/todo-form-view.component';
import { AuthgaurdService } from './services/authgaurd.service';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserFormCreateComponent,
    UserFormEditComponent,
    UserFormViewComponent,
    RegisterFormComponent,
    LoginFormComponent,
    HomeComponent,
    ToDoComponent,
    TodoFormCreateComponent,
    TodoFormEditComponent,
    TodoFormViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
