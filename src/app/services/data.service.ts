import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
  useValue : null
})
export class DataService {

  constructor(private url : string , private http: HttpClient) { 
  }
  getAll() {
    return this.http.get(this.url);
  }
  create(body: any, header:any){
    return this.http.post(this.url, body, header);
  }
  patch(id: string | number, body: any, header:any){
    header = header || {};
    return this.http.patch(`${this.url}/${id}`, body, header);
  }
  put(id: string | number, body: any, header:any) {
    header = header || {};
    return this.http.put(`${this.url}/${id}`, body, header);
  }
  delete(id: string | number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getById(id: string | number) {
    return this.http.get(`${this.url}?id=${id}`);
  }
  getByUsername(username: string) {
    return this.http.get(`${this.url}?username=${username}`);
  }
}
