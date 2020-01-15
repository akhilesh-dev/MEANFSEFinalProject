import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { ViewTaskService } from './view-task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  constructor(private router: Router, private viewTaskService: ViewTaskService, private datePipe: DatePipe) { }

  tasks : Task[];
  ngOnInit() {
    
  }
  projectId: any= "";
  getTasks(pId){
    this.projectId=pId;
    this.viewTaskService.getTasks(pId)
    .subscribe(data =>{
      this.tasks=data;
    })
  };

  updateTask(task : Task){
    this.viewTaskService.updateTask(task)
    .subscribe(data =>{
      alert("Task updated successfully!");
      this.updateTask(this.projectId);
    })
  }

  endTask(taskId){
    this.viewTaskService.endTask(taskId)
    .subscribe(data =>{
      alert("Task completed successfully!");
      this.endTask(this.projectId);
    })
  }

  // sorting logic
  key = 'projectName'; // sort default by projectName
  reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
