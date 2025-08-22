import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommentService } from '../../services/comment.service';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { TooltipComponent } from "../../../../shared/components/tooltip.component";
import { RelativeTimePipe } from "../../../../shared/pipes/relative-time.pipe";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { FilterStore } from '../../../../core/stores/filter.store';

@Component({
  selector: 'app-task-details.components',
  imports: [CommonModule, FormsModule, ClickOutsideDirective, TooltipComponent, RelativeTimePipe,
     MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task-details.components.html',
  styleUrl: './task-details.components.css'
})
export class TaskDetailsComponents implements OnInit {

  constructor(private taskService: TaskService,
     private commentService: CommentService, 
     private route: ActivatedRoute,
    private filter:FilterStore
    ) {}

  ngOnInit(): void {
    this.filter.showFilter = false;
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id') ?? '';
      console.log('Task ID:', this.taskId);
    });
  }
taskId!: string;

  task = {
    _id : "1",
    title: 'Implement Authentication',
    description: 'Create login and registration functionality for the app.',
    createdBy: 'John Doe',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Jane Smith',
    dueDate: new Date('2025-08-15'),
    createdAt: new Date('2025-08-01T10:00:00'),
    updatedAt: new Date('2025-08-13T14:00:00')
  };



  attachments = [
    { name: 'Requirements.docx', url: '#' },
    { name: 'Design.png', url: '#' }
  ];

  statuses = ['Open', 'In Progress', 'Completed', 'On Hold'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];


  comments = [
    { userId: 'Jane', text: 'We need to finalize API endpoints.', createdAt: new Date(), avatarUrl: 'https://i.pravatar.cc/1020', isEditing: false },
    { userId: 'John', text: 'Endpoints are ready.', createdAt: new Date(), avatarUrl: 'https://i.pravatar.cc/190',  isEditing: true },
  ];

  activities = [
    { icon: 'add', message: 'Task created by John Doe', timestamp: new Date('2025-08-01T10:00:00') },
    { icon: 'edit', message: 'Status changed to In Progress', timestamp: new Date('2025-08-02T12:00:00') },
    { icon: 'person', message: 'Assigned to Jane Smith', timestamp: new Date('2025-08-03T15:30:00') }
  ];

  currentUserId = '1'; // Simulating current user ID
  users = [
    { id: '1', name: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/100' },
    { id: '2', name: 'John Doe', avatarUrl: 'https://i.pravatar.cc/10' },
    { id: '3', name: 'Mike Johnson', avatarUrl: 'https://i.pravatar.cc/12' }
  ];

  newComment = '';

  isAssigneeOpen = false;
assigneeSearch = '';
selectedAssignee: any;

filteredUsers() {
  if (!this.assigneeSearch.trim()) return this.users;
  return this.users.filter(u =>
    u.name.toLowerCase().includes(this.assigneeSearch.toLowerCase())
  );
}

selectAssignee(user: any) {
  this.selectedAssignee = user;
  this.isAssigneeOpen = false;
  this.updateTaskField('assignedTo', user.id);
}

closeDropdown() {
  this.isAssigneeOpen = false;
}


  updateTaskField(field: string, value: any) {
  this.taskService.updateTask(this.task._id, { [field]: value })
    .subscribe({
      next: () => console.log(`${field} updated`),
      error: err => console.error('Update failed', err)
    });
}

saveComment(comment: any) {
  comment.isEditing = false;
  this.commentService.updateComment(comment.id, { text: comment.text })
    .subscribe({
      next: () => console.log('Comment updated'),
      error: err => console.error('Comment update failed', err)
    });
}

 addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        userId: 'You',
        text: this.newComment,
        createdAt: new Date(),
        avatarUrl: '',
        isEditing: false
      });
      this.newComment = '';
    }
  }

}
