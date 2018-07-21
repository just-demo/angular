import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  type: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.type = this.data.type;
    this.message = this.data.message;
  }
}
