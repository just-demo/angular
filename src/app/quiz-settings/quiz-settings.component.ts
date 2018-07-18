import {Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit, OnDestroy {

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Quiz Settings');
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
  }
}
