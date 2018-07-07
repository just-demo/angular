import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BookUploadDialogComponent} from '../book-upload-dialog/book-upload-dialog.component';
import {ActiveBook} from '../active-book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(public activeBook: ActiveBook) {
  }

  ngOnInit() {
    console.log('active book:...');
    // console.log(this.activeBook.text);
  }
}
