import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterStore } from '../../../core/stores/filter.store';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html'
})
export class FilterBarComponent {


  constructor(public filter: FilterStore){}

  users = [
    { id: '1', name: 'Alice Doe' },
    { id: '2', name: 'Bob Smith' },
  ];
  statuses = ['new', 'in progress', 'complete', 'late'];
  // output signal (event-like)
  filtersChanged = output<any>();

  applyFilters() {
    console.log('Applied filters:', this.filter.getFilters());

    // this.filtersChanged.emit({
    //   fromDate: this.fromDate(),
    //   toDate: this.toDate(),
    //   userId: this.userId(),
    //   status: this.status()
    // });
  }
}
