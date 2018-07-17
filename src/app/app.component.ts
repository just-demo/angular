import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {ActiveBook} from './active-book';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {TitleService} from './services/title.service';

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
    // TODO: remove
    this.activeBook.load('test.txt', Array.from(Array(100).keys())
      .map(i => 'line ' + ('' + i).padStart(4, '0'))
      .join('\n'));

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

  getAuthUser(): string {
    return this.authService.getAuthUser();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '235px',
      data: {username: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog output: ' + result);
    });
  }

  logout(): void {
    this.authService.logout();
  }

  openSettings(): void {
    console.log('Settings will be implemented as routerLink...');
  }

  uploadBook(file: File) {
    this.activeBook.clear();
    const reader = new FileReader();
    reader.onload = () => {
      this.userService.addBook(file.name, reader.result);
      this.activeBook.load(file.name, reader.result);
      this.router.navigate(['books', this.activeBook.id, 'pages', 1]);
      // this.router.navigateByUrl('book');
      // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent})
    };
    reader.readAsText(file);
  }
}
