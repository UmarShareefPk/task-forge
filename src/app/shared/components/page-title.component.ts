import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  imports:[CommonModule],
  standalone: true,
  template: `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      <!-- Title + Icon -->
      <div class="flex items-center gap-3">
        <span *ngIf="icon" class="material-icons text-indigo-500 text-3xl">{{ icon }}</span>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {{ title }}
        </h1>
      </div>

      <!-- Subtitle -->
      <p *ngIf="subtitle" class="text-sm text-gray-500 dark:text-gray-400 sm:ml-4">
        {{ subtitle }}
      </p>
    </div>
  `,
})
export class PageTitleComponent {
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() icon?: string; // Material icon name
}
