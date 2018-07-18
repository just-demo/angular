import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  error: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  ngOnInit() {
  }

  submit() {
    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
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
