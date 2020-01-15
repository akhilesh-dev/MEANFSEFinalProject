import { Parent } from './Parent';

export class Task {

    taskId:number;
    parentId:number;
    projectId:number;
    taskName:string;
    startDate:string;
    endDate:string;
    priority:number;
    status:string;
    employeeId:number;
    parent:Parent;
    isParent: boolean
}
