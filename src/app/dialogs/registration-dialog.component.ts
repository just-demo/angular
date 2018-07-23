import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

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
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.username.setErrors({'conflict': true});
        } else {
          this.username.setErrors({'system': true});
          this.password.setErrors({'system': true});
        }
      }
    );
  }
}
