import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnInit(): void {
    
  }
  //Inputs (signals)
   
  initialPageNumber = input<number>(1);
 totalRecords = input<number>(0);

  // Writable local signals
  pageNumber = signal<number>(1);
  pageSize = signal<number>(5);
 

  // Outputs
  pageSizeChanged = output<number>();
  pageNumberChanged = output<number>();

    // Keep local signal in sync with parent input
  constructor() {
    effect(() => {
      this.pageNumber.set(this.initialPageNumber());
    });
  }


  // Computed properties
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()) || 1);
   showPagination = computed(() => this.totalPages() > 1);

  pages = computed(() => {
    const pagesToShow: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      if (i >= this.pageNumber() - 3 && i <= this.pageNumber() + 3) {
        pagesToShow.push(i);
      }
    }
    return pagesToShow;
  });

  pagesBeforeExists = computed(() => this.pages()[0] > 1);
  pagesAfterExists = computed(() => this.pages()[this.pages().length - 1] < this.totalPages());

  information = computed(() => {
    const start = Math.min((this.pageNumber() - 1) * this.pageSize() + 1, this.totalRecords());
    const end = Math.min(this.pageNumber() * this.pageSize(), this.totalRecords());
    return `Showing ${start}–${end} of ${this.totalRecords()} records (${this.totalPages()} pages)`;
  });

  // Actions
  changePageNumber(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageNumber.set(page);
      this.pageNumberChanged.emit(page);
    }
  }

  changePageSize(size: number) {
    this.pageSize.set(size);
    this.pageNumber.set(1);
    this.pageSizeChanged.emit(size);
  }

  previous() {
    this.changePageNumber(this.pageNumber() - 1);
  }

  next() {
    this.changePageNumber(this.pageNumber() + 1);
  }

  
}
