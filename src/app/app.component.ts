import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {ActiveBook} from './active-book';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {TitleService} from './services/title.service';
import {RegistrationDialogComponent} from './dialogs/registration-dialog.component';
import {BooksDialogComponent} from './dialogs/books-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = null;
  private recentBookCount = 5;

  constructor(
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
    return !!this.userService.getBooks().length;
  }

  getRecentSavedBookIds(): string[] {
    return this.userService.getBooks().slice(0, this.recentBookCount);
  }

  hasNonRecentSavedBooks(): boolean {
    return this.userService.getBooks().length > this.recentBookCount;
  }

  openBooksDialog(): void {
    this.dialog.open(BooksDialogComponent, {
      width: '300px'
    });
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
    this.userService.clearUserData();
    this.authService.logout();
  }

  uploadBook(file: File) {
    this.activeBook.clear();
    const reader = new FileReader();
    reader.onload = () => {
      this.userService.addBook(file.name, reader.result);
      this.activeBook.load(file.name, reader.result);
      console.log('RRRRRRRRRRRRREEEEEEEEEEEEEEDDDDDDDDDD');
      console.log(this.activeBook.id);
      const bookId =  this.activeBook.id.split('').join('');
      // TODO: why is it throwing an error???????????????????????????????????????????????????????
      this.router.navigate(['/books',  this.activeBook.id]);
      // this.router.navigate(['/data', 'books']);
    };
    reader.readAsText(file);
  }
}
