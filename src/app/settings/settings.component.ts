import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';
import {AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../dialogs/change-password-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  username: String;

  constructor(
    private titleService: TitleService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.getAuthUser();
    this.titleService.setTitle('Account Settings');
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
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
