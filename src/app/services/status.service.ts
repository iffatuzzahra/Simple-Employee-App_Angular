import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusList = [
    {
      value: 0, 
      text: 'Non Active'
    }, 
    {
      value: 1, 
      text: 'Active'
    }, 
    {
      value: 2, 
      text: 'Leave'
    }
  ]
  constructor() { }
  getAll() {
    return this.statusList;
  }
  getText(statusValue: number | string) {
    return this.statusList.find(s => s.value == statusValue)?.text;
  }
}
