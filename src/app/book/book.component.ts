import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookParserService} from '../services/book-parser.service';
import {ActiveBook} from '../active-book';
import {BookReaderComponent} from '../book-reader/book-reader.component';
import {BookStatisticsComponent} from '../book-statistics/book-statistics.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  mode: string;

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

  setMode(event: Object): void {
    if (event instanceof BookReaderComponent) {
      this.mode = 'pages';
    } else if (event instanceof BookStatisticsComponent) {
      this.mode = 'statistics';
    } else {
      this.mode = null;
    }
  }

  isMode(mode: string): boolean {
    return this.mode === mode;
  }

  getBookId(): string {
    return this.activeBook.id;
  }

  private initBook(bookId: string): void {
    if (this.activeBook.id !== bookId) {
      // TODO: retrieve from database;
      this.activeBook.load(bookId, 'This is a test book. Book, book, books...');
    }
  }
}
