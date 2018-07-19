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
  // @Input() column: string;
  @Input() columns: any;
  // @Input() valueType: string;
  customColumns: any;
  identityColumn: string;
  displayedColumns: string[];
  pageSizeOptions: number[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private paginationHelperService: PaginationHelperService
  ) {
  }

  ngOnInit() {
    this.identityColumn = this.buildIdentityColumn(this.columns);
    this.customColumns = {};
    Object.keys(this.columns).forEach(column => this.customColumns[column || this.identityColumn] = this.columns[column]);
    this.displayedColumns = ['icon', ...Object.keys(this.customColumns), 'select'];
  }

  @Input()
  set values(values: string[]) {
    // Injecting values via setter to make the table refreshed each time input values are changes
    this.pageSizeOptions = this.paginationHelperService.getPageSizeOptions(values.length);
    this.dataSource = new MatTableDataSource(values);
    this.dataSource.paginator = this.paginator;
  }

  getFieldValue(row: any, field: string) {
    let value = row;
    for (const key of field.split('.')) {
      value = key && key !== this.identityColumn ? value[key] : value;
    }
    return value;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  getSelected(): any[] {
    return this.selection.selected;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  private buildIdentityColumn(columns: any) {
    return Object.keys(columns)
      .filter(column => column)
      .map(column => column.replace(/\./g, '-'))
      .concat('identity')
      .join('-');
  }
}
