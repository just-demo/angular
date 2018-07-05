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
  constructor(public authService: AuthService,
              public dialog: MatDialog,
              private activeBook: ActiveBook,
              private router: Router) {
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
    this.activeBook.text = null;
    const reader = new FileReader();
    reader.onload = () => {
      this.activeBook.text = reader.result;
      console.log('Uploaded book...');
      console.log(this.activeBook.text);
      this.router.navigateByUrl('book');
      // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent})
    };
    reader.readAsText(file);
  }
}
