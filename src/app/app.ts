import { Component, effect, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavComponent } from "./shared/components/nav.component/nav.component";
import { AuthService } from './features/auth/services/auth.service';
import { CommonModule } from '@angular/common'; 
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { ThemeService } from './core/services/theme.service';
import { FilterBarComponent } from "./shared/components/filter-bar.component/filter-bar.component";
import { FilterStore } from './core/stores/filter.store';

@Component({
  selector: 'app-root',
   standalone: true, 
  imports: [RouterOutlet, NavComponent, CommonModule, FilterBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    // Access the computed signal

  constructor(private authService:AuthService, private router:Router, private themeService:ThemeService, public filter:FilterStore){
    effect(() => {  
      this.isUserLoggedIn = this.authService._isLoggedIn();
      if (!this.isUserLoggedIn) {
        console.log("User logged out → navigating to /login");
        this.router.navigate(['/login']);
      }
    });
  }


 isUserLoggedIn:boolean = false;


 currentFilters: any = {};
teamUsers = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

onFiltersChanged(filters: any) {
  this.currentFilters = filters;
}



  protected readonly title = signal('task-forge1');

  ngOnInit(): void{ 
    this.themeService.setInitialTheme();
  }

}
