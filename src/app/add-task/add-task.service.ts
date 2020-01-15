import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
  export class AddTaskService {
  
   constructor(private http:HttpClient) {}
    private taskUrl = 'http://localhost:3000/api/';
  
  public createTask(task) { console.log(task);
      return this.http.post<Task>(this.taskUrl + `tasks/create?isParent=${task.isParent}`, task, httpOptions);
    }
}