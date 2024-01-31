import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { getLocaleId } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private service: HomeService, private router: Router){}

  dataPerPageOptions = [5, 10, 20, 25, 50];

  pageInfo = {
    page: 1,
    start: 0,
    totalPage: [1], 
    dataPerPage: 10
  }

  sortDirection = {
    name: 'desc', 
    email: 'desc', 
    group: 'desc', 
    salary: 'desc'
  }

  employees: any[] = [];
  employeesPerPage: any[] = [];
  searchData: string = '';

  ngOnInit(): void {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.employees = response;
        if (this.searchData != '') {
          this.employees = this.employees.filter(d => (d.firstName + " " + d.lastName).toLowerCase().includes(this.searchData.toLowerCase()) 
                                                  || (d.email as string).toLowerCase().includes(this.searchData.toLowerCase())
                                                  || (d.group as string).toLowerCase().includes(this.searchData.toLowerCase()));
        }
        if (this.employees.length > 0) {
          this.pageInfo.totalPage = new Array(Math.ceil(this.employees.length / this.pageInfo.dataPerPage)).fill(0).map((_, index) => index + 1);
          this.sortByBasicSalary();
          this.sortByGroup();
          this.sortByEmail();
          this.sortByName();
          this.sliceEmployeeData();
        } else {
          alert('No data found');
        }
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }
  sliceEmployeeData() {
    let end = this.pageInfo.start + parseInt(this.pageInfo.dataPerPage.toString(), 10);
    this.employeesPerPage = this.employees.slice(this.pageInfo.start, end);
  }
  onChangePage(page: number) {
    this.pageInfo.page = page; 
    this.pageInfo.start = (page-1) * this.pageInfo.dataPerPage;
    this.sliceEmployeeData();
  }
  onDataPerPageChange() {
    this.pageInfo.totalPage = new Array(Math.ceil(this.employees.length / this.pageInfo.dataPerPage)).fill(0).map((_, index) => index + 1);
    this.onChangePage(1);
    this.sliceEmployeeData();
  }
  onSearch(search: string) {
    this.searchData = search;
    this.pageInfo.page = 1;
    this.pageInfo.start = 0;
    this.getAllEmployee();
  }
  getDetailEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }
  updateEmployee(id: string) {
    this.router.navigate(['/update-employee', id]);
  }
  sortByName() {
    if (this.sortDirection.name === 'desc'){
      this.sortDirection.name = 'asc';
      this.employees.sort((a, b) => (a.firstName + " " + a.lastName).localeCompare(b.firstName + " " + b.lastName));
    } else {
      this.sortDirection.name = 'desc';
      this.employees.sort((a, b) => (b.firstName + " " + b.lastName).localeCompare(a.firstName + " " + a.lastName));
    }
    this.sliceEmployeeData();
  }
  sortByEmail() {
    if (this.sortDirection.email === 'desc'){
      this.sortDirection.email = 'asc';
      this.employees.sort((a, b) => a.email.localeCompare(b.email));
    } else {
      this.sortDirection.email = 'desc';
      this.employees.sort((a, b) => b.email.localeCompare(a.email));
    }
    this.sliceEmployeeData();
  }
  sortByGroup() {
    if (this.sortDirection.group === 'desc'){
      this.sortDirection.group = 'asc';
      this.employees.sort((a, b) => a.group.localeCompare(b.group));
    } else {
      this.sortDirection.group = 'desc';
      this.employees.sort((a, b) => b.group.localeCompare(a.group));
    }
    this.sliceEmployeeData();
  }
  sortByBasicSalary() {
    if (this.sortDirection.salary === 'desc'){
      this.sortDirection.salary = 'asc';
      this.employees.sort((a, b) => a.basicSalary - b.basicSalary);
    } else {
      this.sortDirection.salary = 'desc';
      this.employees.sort((a, b) => b.basicSalary - a.basicSalary);
    }
    this.sliceEmployeeData();
  }
  deleteEmployee(id: string | number) {
    this.service.delete(id).subscribe({
      next: () => {
        alert('berhasil menghapus');
        this.getAllEmployee();
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }
}
