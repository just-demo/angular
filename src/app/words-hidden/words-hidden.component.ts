import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UserService} from '../services/user.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {WordHiddenEnterDialogComponent} from '../word-hidden-enter-dialog/word-hidden-enter-dialog.component';
import {DataTableComponent} from '../data-table/data-table.component';

@Component({
  selector: 'app-words-hidden',
  templateUrl: './words-hidden.component.html',
  styleUrls: ['./words-hidden.component.css']
})
export class WordsHiddenComponent implements OnInit {
  words = [];
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
      data: 'Are you sure you want to delete the words selected?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log(`Deleting ${this.dataTable.getSelected().length} words...`);
        this.dataTable.getSelected().forEach(word => this.userService.setHidden(word, false));
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
    this.words = this.userService.getHidden();
  }
}
