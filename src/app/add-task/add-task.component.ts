import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddTaskService } from './add-task.service';
import { DatePipe } from '@angular/common';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private router: Router, private addTaskService: AddTaskService, private datePipe: DatePipe) { }

  task: Task = new Task();
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;

  ngOnInit() {
    this.task.isParent = false;
  }

  createTask(): void {
    this.error = { isError: false, errorMessage: '' };

    if (!this.task.isParent) {
      this.task.startDate = this.datePipe.transform(this.task.startDate, "yyyy-MM-dd");
      this.task.endDate = this.datePipe.transform(this.task.endDate, "yyyy-MM-dd");
    }
    else {
      this.task.startDate = null;
      this.task.endDate = null;
    }
    console.log(this.task);
    this.isValidDate = this.validateDates(this.task.startDate, this.task.endDate, this.task.projectId, this.task.priority, this.task.employeeId, this.task.taskName, this.task.parentId, this.task.status, this.task.isParent);
    if (this.isValidDate) {
      this.addTaskService.createTask(this.task)
        .subscribe(data => {
          alert("Task created successfully!");
        });
    };
  }

  validateDates(sDate: string, eDate: string, pProject: number, pPriority: number, eID: number, tName: string, pID: number, sStatus: string, iParent: boolean) {
    this.isValidDate = true;

    if (iParent) {
      if (pProject == null || tName == null) {
        this.error = { isError: true, errorMessage: 'Project and Task fields are required.' };
        this.isValidDate = false;
      }
    }
    else {
      if ((sDate == null || eDate == null || pProject == null || pPriority == null || eID == null || tName == null || pID == null || sStatus == null)) {
        this.error = { isError: true, errorMessage: 'All fields are required.' };
        this.isValidDate = false;
      }
      if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
        this.error = { isError: true, errorMessage: 'End date should be greater than the start date.' };
        this.isValidDate = false;
      }
    }


    return this.isValidDate;
  }


}
