import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html'
})
export class ChangePasswordDialogComponent {
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  changePassword() {
    this.authService.changePassword(this.oldPassword.value, this.newPassword.value).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Change password error: ' + error);
        this.oldPassword.setErrors({'rejected': true});
      }
    );
  }
}
