import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';
import {AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../dialogs/change-password-dialog.component';
import {MessageService} from '../message/message.service';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  username: String;

  constructor(
    private titleService: TitleService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private router: Router,
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

  deleteUser(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: 'Are you sure you want to delete your account?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const username = this.authService.getAuthUser();
        this.authService.delete().subscribe(
          () => {
            this.router.navigateByUrl('/');
            this.messageService.info(`Your account and all its associated data has been deleted`);
          },
          () => {
            this.messageService.error(`Error deleting the account`);
          }
        );
      }
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '235px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messageService.info('Password changed successfully');
      }
    });
  }
}
