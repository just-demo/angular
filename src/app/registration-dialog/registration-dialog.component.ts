import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  register() {
    this.authService.register({
      username: this.username.value,
      password: this.password.value
    }).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Login error: ' + error);
        console.error(error);
        console.error(error.status);
        this.username.setErrors({'rejected': true});
        this.password.setErrors({'rejected': true});
      }
    );
  }
}
