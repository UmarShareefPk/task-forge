import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-logo',
  standalone: true,
   imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2 font-bold" [ngClass]="sizeClass">
      <svg
        [ngClass]="iconSizeClass"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="text-indigo-600 dark:text-indigo-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2l4-4m2-3h-1.586a1 1 0 01-.707-.293l-.828-.828A2 2 0 0013.172 4H10.83a2 2 0 00-1.414.586l-.828.828a1 1 0 01-.707.293H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z"
        />
      </svg>
      <span class="text-gray-900 dark:text-white">
        Task<span class="text-indigo-600 dark:text-indigo-400">Forge</span>
      </span>
      <!-- <img src="../assets/logo.png" alt="TaskForge Logo"  /> -->
    </div>
  `,
  styles: [],
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'custom' = 'md'

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'text-lg'
      case 'md':
        return 'text-2xl'
      case 'lg':
        return 'text-4xl'
      case 'custom':
        return ''
      default:
        return 'text-2xl'
    }
  }

  get iconSizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'w-5 h-5'
      case 'md':
        return 'w-7 h-7'
      case 'lg':
        return 'w-10 h-10'
      case 'custom':
        return ''
      default:
        return 'w-7 h-7'
    }
  }
}
