import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MessageComponent} from './message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  error(message: string): void {
    this.show(message, 'error', 3000);
  }

  info(message: string): void {
    this.show(message, 'info', 1000);
  }

  private show(message: string, type: string, duration: number): void {
    this.snackBar.openFromComponent(MessageComponent, {
      duration: duration,
      data: {
        message: message,
        type: type
      }
    });
  }
}
