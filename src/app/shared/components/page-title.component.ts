import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  imports:[CommonModule],
  standalone: true,
  template: `
    <div class="flex items-center gap-2">
      <span *ngIf="icon" class="material-icons text-indigo-500 text-2xl">{{ icon }}</span>
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {{ title }}
        </h1>
        <p *ngIf="subtitle" class="text-sm text-gray-500 dark:text-gray-400">
          {{ subtitle }}
        </p>
      </div>
    </div>
  `,
})
export class PageTitleComponent {
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() icon?: string; // Material icon name
}
