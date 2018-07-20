import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComparatorService, MatchResult} from './comparator.service';
import {RandomService} from './random.service';
import {UserService} from '../services/user.service';
import {KeyValue} from './key-value';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {TitleService} from '../services/title.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: ElementRef;
  sequenceModes = ['uniform', 'ordered', 'random'];
  translations: KeyValue[] = [];
  sequenceIndex: number;

  randomIndexes: number[];
  history: number[];
  inputTranslation: string;
  sequenceMode;
  resultType: string; // pass, check
  matchResult: MatchResult;
  hintVisible = false;

  constructor(
    private titleService: TitleService,
    private dialog: MatDialog,
    private userService: UserService,
    private randomService: RandomService,
    private comparatorService: ComparatorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const mode = params['mode'];
      if (this.sequenceModes.indexOf(mode) < 0) {
        this.router.navigateByUrl('/quiz');
      } else {
        this.startQuiz(mode);
      }
    });
  }

  ngOnDestroy(): void {
    this.titleService.clearTitle();
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        event.shiftKey ? this.back() : this.next();
        break;
      case 'Enter':
        event.preventDefault();
        event.ctrlKey ? this.pass() : this.check();
        break;
      case ' ':
        if (event.ctrlKey) {
          event.preventDefault();
          this.hint();
        }
        break;
    }
  }

  next(): void {
    this.sequenceIndex = (this.sequenceIndex + 1) % this.translations.length;
    let currentIndex;
    switch (this.sequenceMode) {
      case 'uniform':
        // TODO: optimize with slice???
        if (this.sequenceIndex === 0 || !this.randomIndexes) {
          this.randomIndexes = this.randomService.randomIntArray(this.translations.length);
        }
        currentIndex = this.randomIndexes[this.sequenceIndex];
        break;
      case 'ordered':
        currentIndex = this.sequenceIndex;
        break;
      case 'random':
        currentIndex = this.randomService.randomInt(this.translations.length);
        break;
    }
    this.history.push(currentIndex);
    this.updateTitle();
    this.resetResult();
  }

  back(): void {
    if (this.history.length > 1) {
      this.sequenceIndex = (this.sequenceIndex - 1 + this.translations.length) % this.translations.length;
      this.history.pop();
      this.updateTitle();
      this.resetResult();
    }
  }

  check(): void {
    this.resultType = 'check';
    this.matchResult = this.comparatorService.compare(this.inputTranslation || '', this.getTranslationValue());
    this.focusInput();
  }

  pass(): void {
    this.resultType = 'pass';
    this.focusInput();
  }

  hint(): void {
    this.hintVisible = true;
    setTimeout(() => {
      this.hintVisible = false;
    }, 500);
  }

  getTranslationKey(): string {
    return this.translations[this.getCurrentIndex()].key;
  }

  getTranslationValue(): string {
    return this.translations[this.getCurrentIndex()].value;
  }

  isResult(resultType: string): boolean {
    return this.resultType === resultType;
  }

  isHintVisible(): boolean {
    return this.hintVisible;
  }

  focusInput(): void {
    this.input.nativeElement.focus();
  }

  isQuizEmpty(): boolean {
    return !Object.keys(this.userService.getTranslations()).length;
  }

  delete(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: 'Are you sure you want to remove current word from quiz?'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.removeTranslation(this.getTranslationKey(), this.getTranslationValue());
        this.translations.splice(this.getCurrentIndex(), 1);
        this.randomIndexes.splice(this.sequenceIndex, 1);
        this.randomIndexes = this.randomIndexes.map(index => index > this.getCurrentIndex() ? index - 1 : index);
      }
    });
  }

  private startQuiz(mode: string): void {
    this.sequenceMode = mode;
    const translations = this.userService.getTranslations();
    Object.keys(translations).forEach(value => translations[value].forEach(key =>
      this.translations.push(new KeyValue(key, value))
    ));
    if (!this.translations.length) {
      // Just to show ability of the screen
      this.translations.push(
        new KeyValue('пример', 'example'),
        new KeyValue('демонстрация', 'demonstration')
      );
    }
    this.sequenceIndex = -1;
    this.history = [];
    this.next();
  }

  private getCurrentIndex(): number {
    return this.history[this.history.length - 1];
  }

  private resetResult(): void {
    this.resultType = null;
    this.matchResult = null;
    this.inputTranslation = null;
    this.focusInput();
  }

  private updateTitle(): void {
    this.titleService.setTitle('Quiz: ' + this.history.length);
  }
}
