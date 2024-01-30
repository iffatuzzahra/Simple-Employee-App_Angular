import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailEmployeeService } from './detail-employee.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrl: './detail-employee.component.css'
})
export class DetailEmployeeComponent implements OnInit{
  employee : any = {
    id: '', 
    username: '',
    firstName: '', 
    lastName: '', 
    email:'', 
    birthDate:'', 
    basicSalary: 0, 
    status: '', 
    group: '', 
    desciption: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private service : DetailEmployeeService, private status : StatusService) {}
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getDetailEmployee(id)
  }
  getDetailEmployee(id: any) {
    console.log(id);
    this.service.getById(id as string).subscribe({
      next: (response: any) => {
        this.employee = response[0];
        this.employee.status = this.status.getText(this.employee.status);
        console.log(this.status.getText(this.employee.status))
        console.log(this.employee);
      }, 
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  onBackClick() {
    this.router.navigate(['/']);
  }
}
