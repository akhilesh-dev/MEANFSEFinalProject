import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { OrderModule } from 'ngx-order-pipe';
import { DatePipe } from '@angular/common';
import { ProjectService } from './add-project/project.service';
import {UserService} from './user.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    OrderModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService,ProjectService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
