import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ComparatorService, MatchResult} from './comparator.service';
import {RandomService} from './random.service';
import {UserService} from '../services/user.service';
import {KeyValue} from './key-value';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  sequenceModes = {
    'uniform': 'Uniform',
    'ordered': 'Ordered',
    'random': 'Random'
  };

  translations: KeyValue[] = [];
  sequenceIndex: number;

  randomIndexes: number[];
  history: number[];
  inputTranslation: string;
  sequenceMode = 'uniform';
  resultType: string; // pass, check
  matchResult: MatchResult;
  hintVisible = false;

  constructor(
    private userService: UserService,
    private randomService: RandomService,
    private comparatorService: ComparatorService
  ) {
  }

  ngOnInit() {
    const translations = this.userService.getTranslations();
    Object.keys(translations).forEach(value => translations[value].forEach(key =>
      this.translations.push(new KeyValue(key, value))
    ));
    this.sequenceIndex = -1;
    this.history = [];
    this.next();
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
    if (this.sequenceMode === 'random') {
      currentIndex = this.randomService.randomInt(this.translations.length);
    } else if (this.sequenceMode === 'ordered') {
      currentIndex = this.sequenceIndex;
    } else if (this.sequenceMode === 'uniform') {
      if (this.sequenceIndex === 0 || !this.randomIndexes) {
        this.randomIndexes = this.randomService.randomIntArray(this.translations.length);
      }
      currentIndex = this.randomIndexes[this.sequenceIndex];
    }

    this.history.push(currentIndex);
    this.resetResult();
  }

  back(): void {
    if (this.history.length > 1) {
      this.sequenceIndex = (this.sequenceIndex - 1 + this.translations.length) % this.translations.length;
      this.history.pop();
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

  getCounter(): number {
    return this.history.length;
  }

  focusInput(): void {
    this.input.nativeElement.focus();
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
}