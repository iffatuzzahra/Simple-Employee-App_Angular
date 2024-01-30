import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormEmployeeService } from './form-employee.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit{

  upsertForm!: FormGroup; 
  urlParam: any = "";

  groupList = [
    'Software Development',
    'Network Operations',
    'Database Administration',
    'Cybersecurity',
    'IT Support',
    'Quality Assurance',
    'Frontend',
    'Backend',
    'Systems Analysis',
    'UI/UX'
  ];
  selectedGroup = '';
  statusList: any[] = [];
  selectedStatus = 0;
  constructor(private formBuilder: FormBuilder, 
              private acitavedRoute: ActivatedRoute, 
              private router : Router, 
              private service: FormEmployeeService, 
              private status: StatusService) {
  }
  ngOnInit(): void {
    this.urlParam = this.acitavedRoute.snapshot.paramMap.get('id');
    this.statusList = this.status.getAll();
    this.createAddForm();
    if(this.urlParam && this.urlParam !== "__add") {
      this.createUpdateForm(this.urlParam as string);
    }
  }
  createAddForm(){
    console.log(new Date().getDate())
    this.upsertForm = this.formBuilder.group({
      id: [null],
      username: ["", Validators.compose([Validators.required])], 
      firstName: ["", Validators.compose([Validators.required])], 
      lastName: ["", Validators.compose([Validators.required])], 
      email: ["", Validators.compose([Validators.required, Validators.email])], 
      birthDate: ["", Validators.compose([Validators.required, this.validateMaxDate()])], 
      basicSalary: [0, Validators.compose([Validators.required, Validators.min(10000), Validators.max(1000000000)])], 
      status: [0, Validators.compose([Validators.required, Validators.min(0)])], 
      group: ["", Validators.compose([Validators.required])], 
      description: ["", Validators.compose([Validators.required])]
    })
  }
  createUpdateForm(id : string){
    console.log(id);
    let employee: any;
    this.service.getById(id).subscribe({
      next: (response: any) => {
        employee = response[0];
        employee.birthDate = new Date(employee.birthDate).toISOString().split('T')[0];
        this.selectedGroup = employee.group;
        this.selectedStatus = employee.status;

        this.upsertForm = this.formBuilder.group({
          id: [employee.id],
          username: [{value: employee.username, disabled: true}, Validators.compose([Validators.required])], 
          firstName: [employee.firstName, Validators.compose([Validators.required])], 
          lastName: [employee.lastName, Validators.compose([Validators.required])], 
          email: [employee.email, Validators.compose([Validators.required, Validators.email])], 
          birthDate: [employee.birthDate, Validators.compose([Validators.required, this.validateMaxDate()])], 
          basicSalary: [employee.basicSalary, Validators.compose([Validators.required, Validators.min(10000), Validators.max(1000000000)])], 
          status: [employee.status, Validators.compose([Validators.required, Validators.min(0)])], 
          group: [employee.group, Validators.compose([Validators.required])], 
          description: [employee.description, Validators.compose([Validators.required])]
        });
      }, 
      error: (error) => {
        console.log(error); 
      }
    });
  }
  validateMaxDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      const isAfterToday = selectedDate.getTime() > today.getTime();
      return isAfterToday ? { 'maxDate': { value: control.value } } : null;
    };
  }
  onCancel() {
    this.router.navigateByUrl('/');
  }
  onSubmit() {
    const newEmployee = this.upsertForm?.getRawValue();

    if(this.urlParam && this.urlParam !== "__add") {
      this.updateEmployee(newEmployee);
    } 
    else {
      this.service.getByUsername(newEmployee.username).subscribe({
        next: (response: any) => {
            const employee = response;
            console.log(employee);
            if (employee.length > 0) {
              alert("username sudah digunakan");
              return ;
            } else {
              this.addEmployee(newEmployee);
              this.router.navigateByUrl('/');
            }   
        }, 
        error: (error: any) => {
            console.log(error);
        }
      });
    }
  }
  addEmployee(newEmployee: any) {
    delete newEmployee.id
    const header = {
      'Content-type': 'application/json; charset=UTF-8',
    }
    this.service.create(newEmployee, header).subscribe({
      next: (response) => {
        console.log(response);
        alert('berhasil menambahkan'); 
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }
  updateEmployee(newEmployee: any) {
    const header = {
      'Content-type': 'application/json; charset=UTF-8',
    }
    this.service.patch(newEmployee.id, newEmployee, header).subscribe({
      next: (response) => {
        console.log(response);
        alert(('berhasil mengupdate')); 
        this.router.navigateByUrl('/');
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }
}
