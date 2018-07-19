import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {AuthService} from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  login() {
    this.authService.login({
      username: this.username.value,
      password: this.password.value
    }).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Login error: ' + error);
        this.username.setErrors({'rejected': true});
        this.password.setErrors({'rejected': true});
      }
    );
  }
}
