import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[];

  ngOnChanges() {
    this.updatePages();
  }

  updatePages() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
    this.currentPageChange.emit(page);
  }
}