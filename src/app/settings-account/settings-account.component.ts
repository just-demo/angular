import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.css']
})
export class SettingsAccountComponent implements OnInit {
  username: String;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.username = this.authService.getAuthUser();
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '235px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog output: ' + result);
    });
  }


}
