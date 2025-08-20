import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login.component/login.component';
import { authGuard } from '../app/core/guards/auth.guard';
import { TasksComponent } from './features/tasks/components/tasks.component/tasks.component';
import { TaskDetailsComponents } from './features/tasks/components/task-details.components/task-details.components';


export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
{ path: 'task-details/:id', component: TaskDetailsComponents, canActivate: [authGuard] },

];
