import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, OnDestroy {
  selectedIndex: number;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('User Data');
    this.route.queryParams.subscribe(params => {
      this.selectedIndex = params['tab'];
    });
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
  }
}
