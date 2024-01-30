import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm! : FormGroup;

  constructor(private formBuilder: FormBuilder , private service: LoginService, private router : Router) {
    this.loginForm = this.createForm();
  }

  createForm(){
    return this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])], 
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  onSubmit() {
    const value = this.loginForm?.getRawValue();
    this.service.getByUsername(value.username).subscribe({
      next: (response: any) => {
          let employee = response[0];
          if (employee && (value.password === 'indocyber')) {
              localStorage.setItem('token', employee.username);
              this.router.navigateByUrl('/');
          } else {
            return alert('username atau password salah');
          }
      }, 
      error: (error: any) => {
          console.log(error)
      }
    });
  }
  
}

