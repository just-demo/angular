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
import {MessageService} from './message/message.service';

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

  getActiveBookName(): string {
    return this.activeBook.name;
  }

  hasSavedBooks(): boolean {
    return !!this.userService.getBookNames().length;
  }

  getRecentSavedBookNames(): string[] {
    return this.userService.getBookNames().slice(0, this.recentBookCount);
  }

  hasNonRecentSavedBooks(): boolean {
    return this.userService.getBookNames().length > this.recentBookCount;
  }

  openBook(name: string): void {
    this.userService.getBook(name).subscribe(text => {
      if (text === null) {
        this.messageService.error(`Book "${name}" was not found`);
      } else {
        this.activeBook.load(name, text);
        this.router.navigate(['/books', this.activeBook.name]);
      }
    });
  }

  openBooksDialog(): void {
    this.dialog.open(BooksDialogComponent, {
      width: '300px'
    }).afterClosed().subscribe(name => this.openBook(name));
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
    this.authService.logout();
    // Refreshing did no work when when logging out from book reader page
    this.router.navigateByUrl('/');
    this.messageService.info('You have been successfully logged out');
  }

  uploadBook(file: File) {
    this.activeBook.clear();
    const reader = new FileReader();
    reader.onload = () => {
      this.userService.saveBook(file.name, reader.result);
      this.activeBook.load(file.name, reader.result);
      this.router.navigate(['/books', this.activeBook.name]);
    };
    reader.readAsText(file);
  }
}
