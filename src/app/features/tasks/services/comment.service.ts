import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
   constructor(private http: HttpClient) {}
  
  updateComment(id: string, changes: { text: string }) {
  return this.http.patch(`/api/comments/${id}`, changes);
}
}
