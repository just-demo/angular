import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Credentials} from '../credentials';
import {AppComponent} from '../app.component';
import {BookReaderComponent} from '../book-reader/book-reader.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css']
})
export class WordDialogComponent {
  redirect: EventEmitter<string> = new EventEmitter<string>();
  selectedTabIndex = 0;
  // customTranslation: string;
  selected = {};

  constructor(
    public dialogRef: MatDialogRef<BookReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // credentials = credentials || {
    //   username: '',
    //   password: ''
    // };
  }

  submit(): void {
    this.aaa.emit('dummy result emitted');
    this.dialogRef.close();
    // return 'dummy result returned';
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isSelected(translation: string): boolean {
    return !!this.selected[translation];
  }

  toggleSelection(translation: string): void {
    this.selected[translation] = !this.selected[translation];
  }

  redirectTo(word: string): void {
    this.redirect.emit(word);
    this.selectedTabIndex = 0;
    // console.log('Emitted....');
  }

}
