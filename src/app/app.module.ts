import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { LoginService } from './login/login.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { DetailEmployeeService } from './detail-employee/detail-employee.service';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormEmployeeService } from './form-employee/form-employee.service';
import { StatusService } from './services/status.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    DetailEmployeeComponent,
    FormEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [
    DataService,
    HomeService, 
    LoginService, 
    DetailEmployeeService, 
    FormEmployeeService,
    StatusService,
    AuthGuard, 
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
