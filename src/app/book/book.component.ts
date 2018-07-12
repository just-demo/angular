import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BookUploadDialogComponent} from '../book-upload-dialog/book-upload-dialog.component';
import {ActiveBook} from '../active-book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  text: string;

  constructor(public activeBook: ActiveBook,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init(params['bookId']);
    });
  }

  private init(bookId: string): void {
    // TODO: retrieve from database;
    this.bookId = bookId;
    this.text += this.activeBook.id === bookId ? this.activeBook.text : 'Book not found...';
  }
}
