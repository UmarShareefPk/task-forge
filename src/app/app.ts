import { Component, effect, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavComponent } from "./shared/components/nav.component/nav.component";
import { AuthService } from './features/auth/services/auth.service';
import { CommonModule } from '@angular/common'; 
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
   standalone: true, 
  imports: [RouterOutlet, NavComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    // Access the computed signal

  constructor(private authService:AuthService, private router:Router, private themeService:ThemeService){
    effect(() => {
      console.log("effect is called");
      this.isUserLoggedIn = this.authService._isLoggedIn();
      if (!this.isUserLoggedIn) {
        console.log("User logged out → navigating to /login");
        this.router.navigate(['/login']);
      }
    });
  }


 isUserLoggedIn:boolean = false;


  protected readonly title = signal('task-forge1');

  ngOnInit(): void{ 
    this.themeService.setInitialTheme();
  }

}
