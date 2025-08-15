import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination.component/pagination.component';
import { LoadingComponent } from "../../../../shared/components/loading.component";
import { IconMapPipe } from "../../../../shared/pipes/icon-map.pipe";
import { TooltipComponent } from "../../../../shared/components/tooltip.component";
import { PageTitleComponent } from "../../../../shared/components/page-title.component";
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule,  RelativeTimePipe, FormsModule,
     PaginationComponent, LoadingComponent, IconMapPipe, TooltipComponent, PageTitleComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
viewTaskDetails(taskId: string) {
    // Navigate to task details page with the selected task ID
    window.location.href = `/task-details?taskId=${taskId}`;

}
  
   tasks: Task[] = [];
  totalCount = 0;
  pageSize = 5;
  pageNumber = 1;
  loading = true;
  searchText = '';
  private searchSubject = new Subject<string>();

  constructor(private taskService: TaskService) {
       this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(text => {
        this.pageNumber = 1; // reset to first page when searching
        this.loadTasks(text);
      });
  }

    onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(search: string = '') {
    this.loading = true;
    this.taskService.getPagedTasks(this.pageSize, this.pageNumber, 'createdAt', 'desc', this.searchText).subscribe({
      next: (res) => {
       // console.log(res);
        this.tasks = res.items;
        this.totalCount = res.totalCount;    
        this.loading = false;
         console.log(this.tasks);
      },
      error: () => {
        this.loading = false;
      }
    });   
  }

  // goToPage(page: number) {
  //   this.pageNumber = page;
  //   this.loadTasks();
  // }

   pageNumberChanged(pageNumber:any){
    this.pageNumber  = pageNumber;
    this.loadTasks();
  }

  pageSizeChanged(pageSize:any){
    this.pageSize  = pageSize;
    this.pageNumber = 1;
    this.loadTasks();
  }

}
