import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService, private datePipe: DatePipe) { }

  project: Project = new Project();
  projects: Project[];
  public buttonName: any = 'Add';

  ngOnInit() {
    this.buttonName = "Add";
    this.project.selectDate = false;
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(data => {
        this.projects = data;
      });
  }

  
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  createProject(): void {
    this.error = { isError: false, errorMessage: '' };
    if (this.project.selectDate) {
      this.project.startDate = this.datePipe.transform(this.project.startDate, "yyyy-MM-dd");
      this.project.endDate = this.datePipe.transform(this.project.endDate, "yyyy-MM-dd");
    }else{
      this.project.startDate = null;
      this.project.endDate = null;
    }
    this.isValidDate = this.validateDates(this.project.startDate, this.project.endDate, this.project.projectName, this.project.priority, this.project.employeeId, this.project.selectDate);
    if (this.isValidDate) {
      if (this.buttonName === 'Add') {
        this.projectService.createProject(this.project)
          .subscribe(data => {
            alert("Project created successfully!");
            this.getProjects();
          });
      }
      if (this.buttonName === 'Update') {
        this.projectService.updateProject(this.project.projectId, this.project)
          .subscribe(data => {
            alert("Project updated successfully.");
            this.buttonName = "Add";
            this.getProjects();
          });
      }
    }
  };

  validateDates(sDate: string, eDate: string, pProject: string, pPriority: number, eID: number, selectDate: boolean) {
    this.isValidDate = true;

    if (selectDate) {
      if (sDate == null || eDate == null) {
        this.error = { isError: true, errorMessage: 'Start and End dates are required.' };
        this.isValidDate = false;
      }
      if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
        this.error = { isError: true, errorMessage: 'End date should be grater then start date.' };
        this.isValidDate = false;
      }
    }
    if (pProject == null || pPriority == null || eID == null) {
      this.error = { isError: true, errorMessage: 'All fields are mandatory.' };
      this.isValidDate = false;
    }

    return this.isValidDate;
  }

  updateProject(project: Project) {
    this.error = { isError: false, errorMessage: '' };
    this.project.projectId = project.projectId;
    this.project.projectName = project.projectName;
    this.project.startDate = this.datePipe.transform(project.startDate, "yyyy-MM-dd");
    this.project.endDate = this.datePipe.transform(project.endDate, "yyyy-MM-dd");
    this.project.priority = project.priority;
    this.project.employeeId = project.employeeId;

    this.buttonName = "Update";
  }

  removeProject(projectId: string): void {
    this.projectService.removeProject(projectId)
          .subscribe(data => {
            alert("Project deleted successfully!");
            this.getProjects();
          });
  }

  // sorting logic
  key = 'projectName'; // sort default by projectName
  reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
