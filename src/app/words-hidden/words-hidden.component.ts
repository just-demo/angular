import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {UserService} from '../services/user.service';
import {PaginationHelperService} from '../services/pagination-helper.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {WordHiddenEnterDialogComponent} from '../word-hidden-enter-dialog/word-hidden-enter-dialog.component';

@Component({
  selector: 'app-words-hidden',
  templateUrl: './words-hidden.component.html',
  styleUrls: ['./words-hidden.component.css']
})
export class WordsHiddenComponent implements OnInit {
  displayedColumns: string[] = ['select', 'word'];
  pageSizeOptions: number[];
  dataSource: MatTableDataSource<string>;
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private paginationHelperService: PaginationHelperService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.refreshTable();
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

  removeFromHidden(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: 'Are you sure you want to delete the words selected?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log(`Deleting ${this.selection.selected.length} words...`);
        this.selection.selected.forEach(word => this.userService.setHidden(word, false));
        this.refreshTable();
      }
    });
  }

  openWordHiddenEnterDialog(): void {
    this.dialog.open(WordHiddenEnterDialogComponent).afterClosed().subscribe(word => {
      if (word) {
        this.userService.setHidden(word, true);
        this.refreshTable();
      }
    });
  }

  private refreshTable(): void {
    const words = this.userService.getHidden();
    this.pageSizeOptions = this.paginationHelperService.getPageSizeOptions(words.length);
    this.dataSource = new MatTableDataSource(words);
    this.dataSource.paginator = this.paginator;
  }

}
