import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MessageDialogComponent} from '../dialogs/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog: MatDialog) {
  }

  error(message: string): void {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: message,
        type: 'error'
      }
    });
  }

  info(message: string): void {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: message,
        type: 'info'
      }
    });
  }
}
