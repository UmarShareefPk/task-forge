// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkClass = 'dark';

  constructor() {
   
  }

  setInitialTheme():void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add(this.darkClass);
    }
  }

  toggleTheme(): void {
    const html = document.documentElement;
    if (html.classList.contains(this.darkClass)) {
      html.classList.remove(this.darkClass);
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add(this.darkClass);
      localStorage.setItem('theme', 'dark');
    }
  }

  currentTheme():string{
    const theme = localStorage.getItem('theme');
    if(theme)
      return theme;
    return "";
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkClass);
  }
}