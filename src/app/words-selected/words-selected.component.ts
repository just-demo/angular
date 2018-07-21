import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {DataTableComponent} from '../data-table/data-table.component';
import {WordTranslationEnterDialogComponent} from '../dialogs/word-translation-enter-dialog.component';

@Component({
  selector: 'app-words-selected',
  templateUrl: './words-selected.component.html',
  styleUrls: ['./words-selected.component.css']
})
export class WordsSelectedComponent implements OnInit {
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
        this.dataTable.getSelected().forEach(row => this.userService.removeSelected(row.word, row.translation));
        this.refreshTable();
      }
    });
  }

  openWordEnterDialog(): void {
    this.dialog.open(WordTranslationEnterDialogComponent).afterClosed().subscribe(data => {
      if (data && data.word && data.translation) {
        this.userService.saveSelected(data.word, data.translation);
        this.refreshTable();
      }
    });
  }

  private refreshTable(): void {
    const translations = this.userService.getSelected();
    const words = [];
    Object.keys(translations).forEach(word => translations[word].forEach(translation => words.push({
      word: word,
      translation: translation
    })));
    this.words = words;
  }
}
