import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { TodoFormCreateComponent } from './components/todo-form-create/todo-form-create.component';
import { TodoFormEditComponent } from './components/todo-form-edit/todo-form-edit.component';
import { TodoFormViewComponent } from './components/todo-form-view/todo-form-view.component';
import { AuthgaurdService } from './services/authgaurd.service';

const routes: Routes = [
  {
    path: 'create',
    component: TodoFormCreateComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'edit/:id',
    component: TodoFormEditComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'view/:id',
    component: TodoFormViewComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthgaurdService]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: "**",
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
