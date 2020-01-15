import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) {}
  private projectUrl = "http://localhost:3000/api/";
  

  public getProjects() {
    return this.http.get<Project[]>(this.projectUrl + 'projects');
  }

  public createProject(project) {
    return this.http.post<Project>(this.projectUrl + 'projects/create', project, httpOptions);
  }
  
  public updateProject(projectId, data) {
    return this.http.put<Project>(this.projectUrl +`projects/update/${projectId}`, data);
  }

  public removeProject(projectId) {
    return this.http.delete<Project>(this.projectUrl +`projects/remove/${projectId}`);
  }

  

  

}
