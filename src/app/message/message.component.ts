import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'app-message',
  template: '<span class="{{data.type}}">{{data.message}}</span>',
  styles: [`
    .error {
      color: red;
    }

    .info {
      color: green;
    }
  `],
})
export class MessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
