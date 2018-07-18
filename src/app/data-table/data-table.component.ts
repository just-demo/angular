import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PaginationHelperService} from '../services/pagination-helper.service';
import {UserService} from '../services/user.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() iconType: string;
  @Input() valueType: string;
  _values: string[];
  displayedColumns: string[] = ['icon', 'value', 'select'];
  pageSizeOptions: number[];
  dataSource: MatTableDataSource<string>;
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private paginationHelperService: PaginationHelperService
  ) {
  }

  ngOnInit() {
  }

  @Input()
  set values(values: string[]) {
    // Injecting values via setter to make the table refreshed each time input values are changes
    this.pageSizeOptions = this.paginationHelperService.getPageSizeOptions(values.length);
    this.dataSource = new MatTableDataSource(values);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  getSelected(): string[] {
    return this.selection.selected;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
