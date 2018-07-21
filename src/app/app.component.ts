import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {ActiveBook} from './book/active-book';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {TitleService} from './services/title.service';
import {RegistrationDialogComponent} from './dialogs/registration-dialog.component';
import {BooksDialogComponent} from './dialogs/books-dialog.component';
import {TranslationService} from './services/translation.service';
import {WordService} from './services/word.service';
import {MessageService} from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = null;
  private recentBookCount = 5;

  constructor(
    private messageService: MessageService,
    // TODO: find a better way to eagerly initialize the services
    // Injecting WordService TranslationService just to get them initialized on early stages
    private wordService: WordService,
    private translationService: TranslationService,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private activeBook: ActiveBook,
    private router: Router,
    private titleService: TitleService
  ) {
    titleService.subscribeTitle(title => this.title = title);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasActiveBook(): boolean {
    return this.activeBook.isLoaded();
  }

  getActiveBookId(): string {
    return this.activeBook.id;
  }

  hasSavedBooks(): boolean {
    return !!this.userService.getBookIds().length;
  }

  getRecentSavedBookIds(): string[] {
    return this.userService.getBookIds().slice(0, this.recentBookCount);
  }

  hasNonRecentSavedBooks(): boolean {
    return this.userService.getBookIds().length > this.recentBookCount;
  }

  openBook(bookId: string): void {
    this.userService.getBook(bookId).subscribe(text => {
      if (text === null) {
        this.messageService.error(`Book "${bookId}" was not found`);
      } else {
        this.activeBook.load(bookId, text);
        this.router.navigate(['/books', this.activeBook.id]);
      }
    });
  }

  openBooksDialog(): void {
    this.dialog.open(BooksDialogComponent, {
      width: '300px'
    }).afterClosed().subscribe(bookId => this.openBook(bookId));
  }

  getAuthUser(): string {
    return this.authService.getAuthUser();
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent);
  }

  openRegistrationDialog(): void {
    this.dialog.open(RegistrationDialogComponent);
  }

  logout(): void {
    this.activeBook.clear();
    this.userService.clearUserData();
    // TODO: refresh current page to get relevant data displayed! E.g. user should be redirected out of active book page
    this.authService.logout();
  }

  uploadBook(file: File) {
    this.activeBook.clear();
    const reader = new FileReader();
    reader.onload = () => {
      // TODO: consider making server side support dots
      const bookId = file.name.replace(/\./g, '-');
      this.userService.saveBook(bookId, reader.result);
      this.activeBook.load(bookId, reader.result);
      this.router.navigate(['/books', this.activeBook.id]);
    };
    reader.readAsText(file);
  }
}
