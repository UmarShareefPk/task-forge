import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, EffectRef, OnInit, untracked } from '@angular/core';
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
import { NameByUserIdPipe } from "../../../../shared/pipes/name-by-user-id.pipe-pipe";
import { RouterModule } from '@angular/router';
import { FilterStore } from '../../../../core/stores/filter.store';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, RelativeTimePipe, FormsModule, RouterModule,
    PaginationComponent, LoadingComponent, IconMapPipe, TooltipComponent, PageTitleComponent, NameByUserIdPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit { 

  constructor(private taskService: TaskService, public filter: FilterStore) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(text => {
        this.pageNumber = 1; // reset to first page when searching
        this.loadTasks(text);
      });

    this.effectRef = effect(() => {
      const { version } = this.filter.applied(); // only reactive dependency   
       const filtersSnapshot = untracked(() => this.filter.getFilters());
      this.loadTasks(filtersSnapshot, this.searchText);
    });

  }

viewTaskDetails(taskId: string) {   
    window.location.href = `/task-details?taskId=${taskId}`;
}
  
   tasks: Task[] = [];
  totalCount = 0;
  pageSize = 5;
  pageNumber = 1;
  loading = true;
  searchText = '';
  private searchSubject = new Subject<string>();
private effectRef?: EffectRef;

  sortField: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

sort(field: string) {
  if (this.sortField === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortDirection = 'asc';
  }

  this.tasks.sort((a: any, b: any) => {
    const valA = a[field];
    const valB = b[field];

    if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'unfold_more'; // default icon
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }
  
  ngOnInit(): void {
    this.filter.showFilter = true;
    this.filter.showStatus = true;
   // this.loadTasks(this.filter.getFilters());
  }

  ngOnDestroy(): void {
   this.effectRef?.destroy(); // correct way to clean up
}

  loadTasks(filters:any= {}, search: string = '') {
    this.loading = true;
    
   const { fromDate, toDate, userId, status } = filters;
   
    this.taskService.getPagedTasks(this.pageSize, this.pageNumber, 'createdAt', 'desc', this.searchText, 
     status, userId, fromDate, toDate 
    ).subscribe({
      next: (res) => {
       // console.log(res);
        this.tasks = res.items;
        this.totalCount = res.totalCount;    
        this.loading = false;       
      },
      error: () => {
        this.loading = false;
      }
    });   
  }
 
   pageNumberChanged(pageNumber:any){
    this.pageNumber  = pageNumber;
    this.loadTasks(this.filter.getFilters());
  }

  pageSizeChanged(pageSize:any){
    this.pageSize  = pageSize;
    this.pageNumber = 1;
    this.loadTasks(this.filter.getFilters());
  }

}
