// src/app/auth/auth.service.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://localhost:7228/api/auth/login';

  constructor(){
   
  }

  token = localStorage.getItem('token');
   private _loggedIn = signal(!!this.token); 
  readonly _isLoggedIn = computed(() => this._loggedIn()); 

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { Username: username, Password: password })
    .pipe(
      map((m) => {
      //  console.log(m);
      
          this._loggedIn.set(true); 
         return m;
      }
  ));
  }

  logout() {
    localStorage.removeItem('token');
      //  this.userLoggedInSource.next(false);
         this._loggedIn.set(false); 
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
