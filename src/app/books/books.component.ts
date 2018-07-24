import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatDialog} from '@angular/material';
import {DataTableComponent} from '../data-table/data-table.component';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books = [];
  @ViewChild(DataTableComponent) dataTable: DataTableComponent;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.refreshTable();
  }

  isAnySelected(): boolean {
    return !!this.dataTable.getSelected().length;
  }

  delete(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: 'Are you sure you want to delete the books selected?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.dataTable.getSelected().forEach(name => this.userService.removeBook(name));
        this.refreshTable();
      }
    });
  }

  private refreshTable(): void {
    this.books = this.userService.getBookNames();
  }
}
