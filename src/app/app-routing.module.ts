import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { FormEmployeeComponent } from './form-employee/form-employee.component';

const routes: Routes = [
  {
    path: "", 
    canActivate: [AuthGuard],
    component: NavbarComponent,
    children: [
      {
        path: 'employee', 
        component: HomeComponent,
      }, 
      {
        path: 'employee/:id', 
        component: DetailEmployeeComponent
      },
      {
        path: 'add-employee/:id', 
        component: FormEmployeeComponent
      },
      {
        path: 'update-employee/:id', 
        component: FormEmployeeComponent
      },
      {
        path: '', 
        pathMatch: "full", 
        redirectTo: 'employee'
      }
    ]
  }, 
  {
    path: 'login', 
    canActivate: [LoginGuard],
    component: LoginComponent
  }, 
  {
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
