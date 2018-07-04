import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {Credentials} from '../credentials';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent {
  @Output() aaa = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public credentials: Credentials
  ) {
    // credentials = credentials || {
    //   username: '',
    //   password: ''
    // };
  }

  submit(): string {
    this.aaa.emit('dummy result emitted');
    this.dialogRef.close();
    return 'dummy result returned';
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
