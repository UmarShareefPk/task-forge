import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
   imports: [],
  template: `
 <div class="flex flex-col items-center justify-center h-64 w-full animate-fade-in">
  <!-- Spinner -->
  <div class="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
  
  <!-- Text -->
  <p class="mt-4 text-gray-600 dark:text-gray-300 text-lg font-medium">Loading, please wait...</p>
</div>

  `,
  styles: [],
})
export class LoadingComponent {


}
