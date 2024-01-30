import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { HttpClient } from "@angular/common/http";
// import employees from '../../assets/employee.json';

@Injectable()
export class LoginService 
    extends DataService
{
    // constructor() {}
    constructor(http : HttpClient) {
        super(`http://localhost:3000/employee`, http);
    }

    // getByUsername(findUsername: string) {
    //     this.getById(findUsername).subscribe({
    //         next: (response: any) => {
    //             let employees = response;
    //             // let employee = employees.find(c => c.username == findUsername);
    //             return employees;
    //         }, 
    //         error: (error: any) => {
    //             console.log(error)
    //         }
    //     });
    // }
}