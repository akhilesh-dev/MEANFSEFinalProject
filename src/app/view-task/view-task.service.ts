import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ViewTaskService {

  constructor(private http:HttpClient) { }
  private taskUrl = 'http://localhost:3000/api/';

  public getTasks(projectId) {
    return this.http.get<Task[]>(this.taskUrl+`tasks/${projectId}`);
  }

  public updateTask(taskId) {
    return this.http.put(this.taskUrl +`tasks/update/${taskId}`, taskId);
  }

  public endTask(taskId) {
    return this.http.put(this.taskUrl +`tasks/end/${taskId}`, {'status': 'Completed'});
  }
}
