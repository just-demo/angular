import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent {
  @Input() top = 65;
}
