import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Credentials} from '../credentials';
import {AppComponent} from '../app.component';
import {BookReaderComponent} from '../book-reader/book-reader.component';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css']
})
export class WordDialogComponent {
  @Output() aaa = new EventEmitter<string>();

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

}
