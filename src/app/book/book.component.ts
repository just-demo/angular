import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookParserService} from '../services/book-parser.service';
import {ActiveBook} from '../active-book';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {UserService} from '../services/user.service';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
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
      const bookId = params['bookId'];
      // this.initBook(bookId);
      this.titleService.setTitle(bookId);
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
        this.userService.deleteBook(this.activeBook.id);
        this.activeBook.clear();
        this.router.navigateByUrl('/');
      }
    });
  }

  getBookId(): string {
    return this.activeBook.id;
  }

  private initBook(bookId: string): void {
    console.log('BBBBBBBBBBBBB'); // =================
    console.log(bookId); // =================
    console.log(this.activeBook.id); // =================
    if (this.activeBook.id !== bookId) {
      // TODO: retrieve from database;
      // this.router.navigateByUrl('/');
    }
  }
}
