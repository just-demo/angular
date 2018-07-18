import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Settings');
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
  }
}
