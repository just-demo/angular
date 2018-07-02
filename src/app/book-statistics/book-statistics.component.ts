import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.css']
})
export class BookStatisticsComponent implements OnInit {
  @Input() statistics;

  constructor() { }

  ngOnInit() {
    console.log('Statistics:');
    console.log(this.statistics);
  }

}
