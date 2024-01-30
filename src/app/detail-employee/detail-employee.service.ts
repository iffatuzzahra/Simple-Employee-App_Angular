import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DetailEmployeeService extends DataService{

    constructor(http : HttpClient) {
        super(`http://localhost:3000/employee`, http);
    }
}