import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {AuthService} from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe(
      () => {
        this.userService.syncUserData();
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
