import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconMap',
  standalone: true
})
export class IconMapPipe implements PipeTransform {
  private statusIconMap: Record<string, { icon: string; color: string }> = {
    new:         { icon: 'fiber_new',    color: 'text-blue-600 dark:text-blue-400' },
    'inprogress': { icon: 'autorenew',    color: 'text-yellow-600 dark:text-yellow-400' },
    late:        { icon: 'schedule',     color: 'text-red-600 dark:text-red-400' },
    closed:    { icon: 'check_circle', color: 'text-green-600 dark:text-green-400' }
  };

  private severityIconMap: Record<string, { icon: string; color: string }> = {
    low:        { icon: 'low_priority',  color: 'text-gray-500 dark:text-gray-400' },
    medium:     { icon: 'drag_handle',   color: 'text-yellow-600 dark:text-yellow-400' },
    high:       { icon: 'priority_high', color: 'text-orange-600 dark:text-orange-400' },
    critical:   { icon: 'error',         color: 'text-red-600 dark:text-red-400' }
  };

  transform(value: string, type: 'status' | 'severity') {
    if (!value) return { icon: 'help', color: 'text-gray-400 dark:text-gray-500' };

    const map = type === 'status' ? this.statusIconMap : this.severityIconMap;
    return map[value.toLowerCase()] || { icon: 'help', color: 'text-gray-400 dark:text-gray-500' };
  }
}
