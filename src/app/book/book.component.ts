import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookParserService} from '../services/book-parser.service';
import {ActiveBook} from '../active-book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  constructor(
    private bookParserService: BookParserService,
    private activeBook: ActiveBook,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initBook(params['bookId']);
    });
  }

  private initBook(bookId: string): void {
    if (this.activeBook.id !== bookId) {
      // TODO: retrieve from database;
      this.activeBook.load(bookId, 'This is a test book. Book, book, books...');
    }
  }
}
