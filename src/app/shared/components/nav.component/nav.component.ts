import { Component, ElementRef, HostListener, ViewChild  } from '@angular/core';
import { LogoComponent } from "../app-logo.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-nav',
    standalone: true, 
  imports: [LogoComponent, CommonModule, MatIconModule, ClickOutsideDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    userName = 'Umar';
  userImageUrl = 'https://i.pravatar.cc/100';
  showMenu:boolean = false;
  themeText:string = "dark";
  unreadCount = 3; // Example
showNotifications = false;
  notifications = [
    { title: 'New task assigned to you', time: '2 mins ago' },
    { title: 'Project deadline updated', time: '1 hour ago' },
    { title: 'New comment on your post', time: 'Yesterday' },
    { title: 'New comment on your post', time: 'Yesterday' },
    { title: 'New comment on your post', time: 'Yesterday' },
    { title: 'New comment on your post', time: 'Yesterday' },
    { title: 'New comment on your post', time: 'Yesterday' },
    { title: 'New comment on your post', time: 'Yesterday' },

  ];

mobileMenuOpen = false;

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

   constructor(private router:Router, private themeService:ThemeService, private authService:AuthService) {}

 ngOnInit():void {
  this.themeText = this.themeService.currentTheme();
  this.setThemeText();
  let user = this.authService.getCache("currentUser");
  if(user){
    this.userName = user.lastName;
  }
 }

 toggleNotifications() {
  this.showNotifications = !this.showNotifications;
}

viewAllNotifications() {
  // Navigate to notifications page
}

 setThemeText():void {
  let theme = this.themeService.currentTheme();
  if(theme == "dark")
    this.themeText = "Go Light";
  else
     this.themeText = "Go Dark";
 }

   toggleMenu() {   
    this.showMenu = !this.showMenu;
  }
   

  logoClicked():void {
      this.router.navigate(['/tasks'])
  }

  logout() : void{
   // alert("logging out");
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
     this.setThemeText();
  }

}
