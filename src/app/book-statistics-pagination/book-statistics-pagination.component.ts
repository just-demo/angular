import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-book-statistics-pagination',
  templateUrl: './book-statistics-pagination.component.html',
  styleUrls: ['./book-statistics-pagination.component.css']
})
export class BookStatisticsPaginationComponent implements OnInit {
  @Input() length;
  @Output() change = new EventEmitter<{ index: number, size: number }>();
  pageSize;
  pageSizeOptions: number[];

  ngOnInit() {
    this.pageSizeOptions = Array.from(Array(Math.ceil(Math.log10(Math.max(this.length || 10)))).keys())
      .map(i => Math.pow(10, i + 1));
    this.pageSize = this.pageSizeOptions[0];
    this.emit(0, this.pageSize);
  }

  onChange(event: any): void {
    console.log('Pagination component...');
    console.log(event);
    this.emit(event.pageIndex, event.pageSize);
  }

  private emit(index: number, size: number): void {
    this.change.emit({index: index, size: size});
  }
}
