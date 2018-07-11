import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {ActiveBook} from './active-book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private activeBook: ActiveBook,
              private router: Router) {
    this.activeBook.load('test.txt', Array.from(Array(100).keys())
      .map(i => 'line ' + ('' + i).padStart(4, '0'))
      .join('\n'));
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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

  uploadBook(file: File) {
    this.activeBook.clear();
    const reader = new FileReader();
    reader.onload = () => {
      this.activeBook.load(file.name, reader.result);
      this.router.navigate(['books', this.activeBook.id, 'pages', 1]);
      // this.router.navigateByUrl('book');
      // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent})
    };
    reader.readAsText(file);
  }
}
