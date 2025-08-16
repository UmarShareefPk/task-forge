// src/app/auth/auth.service.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http:HttpClient, private router:Router){   
  }

  token = localStorage.getItem('token');
   private _loggedIn = signal(!!this.token); 
  readonly _isLoggedIn = computed(() => this._loggedIn()); 

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiBaseUrl}/auth/login`, { Username: username, Password: password })
    .pipe(
      map((m) => {
                this._loggedIn.set(true); 
         return m;
      }
  ));
  }

  logout() {
    localStorage.removeItem('token');
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

  isTokenExpired(token: string): boolean { 
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true; // invalid token = expired
    }
}
}
