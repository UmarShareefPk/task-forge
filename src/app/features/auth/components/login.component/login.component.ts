import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ this is the key
  imports: [CommonModule, FormsModule], // ✅ needed for ngIf/ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
constructor(

){}

 username = '';
  password = '';
  error = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res:any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/tasks']);
      },
      error: (e) => {
        console.log(e);
        this.error = 'Login failed. Please try again.';
      }
    });
  }
}
