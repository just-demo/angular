import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Credentials} from '../credentials';
import {AppComponent} from '../app.component';
import {BookReaderComponent} from '../book-reader/book-reader.component';
import {FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css']
})
export class WordDialogComponent {
  redirect: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<BookReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  isSelected(word: string, translation?: string): boolean {
    return this.userService.hasTranslation(word, translation);
  }

  toggleSelection(word: string, translation: string): void {
    return this.userService.hasTranslation(word, translation) ?
      this.userService.removeTranslation(word, translation) :
      this.userService.addTranslation(word, translation);
  }

  redirectTo(word: string): void {
    // TODO: consider making the dialog to gather information directly from bookDetails
    this.redirect.emit(word);
  }
}
