import {Component, Inject, OnInit} from '@angular/core';
import {Credentials} from '../credentials';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

}
