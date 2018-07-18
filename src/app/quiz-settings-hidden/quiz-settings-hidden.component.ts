import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {UserService} from '../services/user.service';
import {PaginationHelperService} from '../services/pagination-helper.service';

@Component({
  selector: 'app-quiz-settings-hidden',
  templateUrl: './quiz-settings-hidden.component.html',
  styleUrls: ['./quiz-settings-hidden.component.css']
})
export class QuizSettingsHiddenComponent implements OnInit {
  displayedColumns: string[] = ['select', 'word'];
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
    const words = this.userService.getHidden();
    this.pageSizeOptions = this.paginationHelperService.getPageSizeOptions(words.length);
    this.dataSource = new MatTableDataSource(words);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  isAnySelected(): boolean {
    return !!this.selection.selected.length;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
