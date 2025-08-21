import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../../../environments/environment';
import { PagedResult } from '../../../shared/models/pagedResult.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/taskitems/paged`);
  }

  getPagedTasks(
    pageSize: number,
    pageNumber: number,
    sortBy?: string,
    sortDirection?: 'asc' | 'desc',
    search?: string,
    status?: string | null,
    userId?: string| null,
    fromDate?: string | null,
    toDate?: string| null,
  ): Observable<PagedResult<Task>> {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);

    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortDirection) params = params.set('sortDirection', sortDirection);
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    if (userId) params = params.set('userId', userId);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);
   

    return this.http.get<PagedResult<Task>>(`${environment.apiBaseUrl}/taskitems/paged`, { params });
  }

  updateTask(id: string, changes: Partial<Task>) {
  return this.http.patch(`/api/tasks/${id}`, changes);
}
}
