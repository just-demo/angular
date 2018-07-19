import {Component, OnInit} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {GroupService} from '../services/group.service';
import {TranslationService} from '../services/translation.service';

@Component({
  selector: 'app-word-translation-enter-dialog',
  templateUrl: './word-translation-enter-dialog.component.html'
})
export class WordTranslationEnterDialogComponent implements OnInit {
  word = new FormControl('', [Validators.required]);
  translation = new FormControl('', [Validators.required]);
  wordOptions: string[];
  filteredWordOptions: Observable<string[]>;
  filteredTranslationOptions: Observable<string[]>;
  translationOptionsTrigger = new Subject<string>();

  constructor(
    private groupService: GroupService,
    private translationService: TranslationService
  ) {
  }

  ngOnInit() {
    this.wordOptions = this.groupService.getWords().sort();
    this.filteredWordOptions = this.word.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(this.wordOptions, value))
    );

    this.filteredTranslationOptions = merge(this.translationOptionsTrigger.asObservable(), this.translation.valueChanges).pipe(
      map(value => {
        const translationOptions = this.translationService.getTranslations((this.word.value || '').trim().toLowerCase()).sort();
        return this.filter(translationOptions, value);
      })
    );
  }

  initTranslationOptions(): void {
    this.translationOptionsTrigger.next(this.translation.value);
  }

  private filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().startsWith(filterValue)).slice(0, 5);
  }
}
