import { Component, ElementRef, HostListener, ViewChild  } from '@angular/core';
import { LogoComponent } from "../app-logo.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
    standalone: true, 
  imports: [LogoComponent, CommonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    userName = 'Umar';
  userImageUrl = 'https://i.pravatar.cc/100';
  showMenu:boolean = false;
  themeText:string = "dark";

   constructor(private router:Router, private themeService:ThemeService, private authService:AuthService) {}

 ngOnInit():void {
  this.themeText = this.themeService.currentTheme();
  this.setThemeText();
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

    @ViewChild('menuContainer') menuRef!: ElementRef;

 

   @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.menuRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showMenu = false;
    }
  }

  logoClicked():void {
      this.router.navigate(['/tasks'])
  }

  logout() : void{
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
     this.setThemeText();
  }

}
