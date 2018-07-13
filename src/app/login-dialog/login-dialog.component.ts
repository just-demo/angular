import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {Credentials} from '../credentials';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public credentials: Credentials
  ) {
    // credentials = credentials || {
    //   username: '',
    //   password: ''
    // };
  }

  login() {
    this.authService.login(this.credentials)
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        error => {
          console.error('Error: ' + error);
          this.error = 'Login failed';
        }
      );
  }
}
