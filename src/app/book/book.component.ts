import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookParserService} from '../services/book-parser.service';
import {ActiveBook} from '../active-book';
import {BookReaderComponent} from '../book-reader/book-reader.component';
import {BookStatisticsComponent} from '../book-statistics/book-statistics.component';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {UserService} from '../services/user.service';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  mode: string;

  constructor(
    private titleService: TitleService,
    private dialog: MatDialog,
    private bookParserService: BookParserService,
    private userService: UserService,
    private activeBook: ActiveBook,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initBook(params['bookId']);
      this.titleService.setTitle(this.activeBook.id);
    });
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
  }

  deleteBook(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: 'Are you sure you want to delete the book?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log(`Deleting ${this.activeBook.id}...`);
        this.userService.deleteBook(this.activeBook.id);
        this.activeBook.clear();
        this.router.navigateByUrl('/');
      }
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
