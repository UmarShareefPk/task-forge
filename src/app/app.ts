import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavComponent } from "./shared/components/nav.component/nav.component";
import { AuthService } from './features/auth/services/auth.service';
import { CommonModule } from '@angular/common'; 
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Component({
  selector: 'app-root',
   standalone: true, 
  imports: [RouterOutlet, NavComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private authService:AuthService, private router:Router){

  }

 isLoggedIn: boolean = false ;

  // IsLoggedIn(){
  //     if (!this.authService.isLoggedIn())     
  //          return false;
  //  return true;
  // }

  protected readonly title = signal('task-forge');

  ngOnInit(): void{
    this.authService.userLoggedInObs.subscribe((m) => { 
     this.isLoggedIn = m;
     console.log("login state changed, his.isLoggedIn", this.isLoggedIn)
      if(!m)  this.router.navigate(['/login']);
    });// know as soon as login state is changed
  }

}
