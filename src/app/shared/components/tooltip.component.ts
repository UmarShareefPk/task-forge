// tooltip.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
   template: `<span class="relative group cursor-default">
  <span>{{ displayText }}</span>

  <div
    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
           opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
           transition-all duration-200 ease-out
           bg-gray-800 dark:bg-gray-900 text-white text-sm rounded-lg px-4 py-2 shadow-lg
           border border-gray-700 dark:border-gray-600
           whitespace-nowrap z-50 pointer-events-none"
  >
    {{ tooltipText }}
  </div>
</span>`
})
export class TooltipComponent {
  @Input() displayText!: string; // main text to show
  @Input() tooltipText!: string; // tooltip content
}
