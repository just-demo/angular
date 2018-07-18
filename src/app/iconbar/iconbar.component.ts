import {AfterContentChecked, AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatIcon} from '@angular/material';

@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent implements OnInit, AfterContentInit {
  @ContentChildren(MatIcon) icons: QueryList<CustomComponent>;
  // @ViewChildren(MatIcon) icons: QueryList<CustomComponent>;

  constructor() {
  }

  ngOnInit() {
    console.log(this.icons);
  }

  ngAfterContentInit() {
    console.log(this.icons);
  }

}
