import { Component, inject } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service'

@Component({
  selector: 'app-tasks-main.component',
  imports: [],
  templateUrl: './tasks-main.component.html',
  styleUrl: './tasks-main.component.css'
})
export class TasksMainComponent {
  authService = inject(AuthService);
  logout() : void{
    this.authService.logout();
  }

}
