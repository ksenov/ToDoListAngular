import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue = '';
  editTaskValue = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, () => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;

    this.crudService.addTask(this.taskObj).subscribe(() => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(() => {
      this.ngOnInit();
    }, () => {
      alert("Failed to update task");
    })
  }

  deleteTask(etask: Task) {
    this.crudService.delteTask(etask).subscribe(() => {
      this.ngOnInit();
    }, () => {
      alert("Failed to delete task");
    })
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
