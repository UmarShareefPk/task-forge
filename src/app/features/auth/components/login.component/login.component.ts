import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ThemeService} from '../../../../core/services/theme.service'
import { LogoComponent } from "../../../../shared/components/app-logo.component";
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ this is the key
  imports: [CommonModule, FormsModule, LogoComponent], // ✅ needed for ngIf/ngModel
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
  private themeService = inject(ThemeService);

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res:any) => {
        console.log(res);
        this.authService.saveToken(res.token);
        this.router.navigate(['/tasks']);
      },
      error: (e) => {
        console.log(e);
        this.error = 'Login failed. Please try again.';
      }
    });
  }

toggleTheme() {
    this.themeService.toggleTheme();
  }

}
