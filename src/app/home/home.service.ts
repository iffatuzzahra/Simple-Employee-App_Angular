import { Injectable } from "@angular/core";
// import employees from '../../assets/employee.json';
import { DataService } from "../services/data.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HomeService extends DataService{

    constructor(http : HttpClient) {
        super(`http://localhost:3000/employee`, http);
    }
    // getAll(){
    //     return employees;
    // }
}