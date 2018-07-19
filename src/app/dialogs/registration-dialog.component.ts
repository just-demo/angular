import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html'
})
export class RegistrationDialogComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  register() {
    this.authService.register(this.username.value, this.password.value).subscribe(
      () => {
        this.dialogRef.close();
        this.userService.syncUserData();
      },
      error => {
        console.error('Login error: ' + error);
        // TODO: set 'conflict' on 409 response only
        this.password.setErrors({'conflict': true});
      }
    );
  }
}
