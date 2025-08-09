import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination.component/pagination.component';
import { LoadingComponent } from "../../../../shared/components/loading.component";

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, DatePipe, RelativeTimePipe, PaginationComponent, LoadingComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  
   tasks: Task[] = [];
  totalCount = 0;
  pageSize = 5;
  pageNumber = 1;
  loading = true;

  constructor(private taskService: TaskService) {}

  statusIconMap: Record<string, { icon: string; color: string }> = {
  new:        { icon: 'fiber_new',     color: 'text-blue-500' },
  inprogress: { icon: 'autorenew',     color: 'text-yellow-500' },
  late:       { icon: 'schedule',      color: 'text-red-500' },
  closed:   { icon: 'check_circle',  color: 'text-green-500' }
};

severityIconMap: Record<string, { icon: string; color: string }> = {
  low:       { icon: 'low_priority',   color: 'text-gray-500' },
  medium:    { icon: 'drag_handle',    color: 'text-yellow-600' },
  high:      { icon: 'priority_high',  color: 'text-orange-500' },
  critical:  { icon: 'error',          color: 'text-red-600' }
};

getStatusIcon(status: string) {
  return this.statusIconMap[status.toLowerCase()] || { icon: 'help', color: 'text-gray-400' };
}

getSeverityIcon(severity: string) {
  return this.severityIconMap[severity.toLowerCase()] || { icon: 'help', color: 'text-gray-400' };
}

  
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getPagedTasks(this.pageSize, this.pageNumber).subscribe({
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
