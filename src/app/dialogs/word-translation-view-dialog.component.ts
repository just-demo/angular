import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../services/user.service';
import {TranslationService} from '../services/translation.service';
import {WordService} from '../services/word.service';
import {ActiveBook} from '../active-book';

@Component({
  selector: 'app-word-translation-view-dialog',
  templateUrl: './word-translation-view-dialog.component.html',
  styleUrls: ['./word-translation-view-dialog.component.css']
})
export class WordTranslationViewDialogComponent implements OnInit {
  redirect: EventEmitter<string> = new EventEmitter<string>();
  translations: string[];
  occurrence: number;
  groupOccurrences: any;

  constructor(
    private userService: UserService,
    private translationService: TranslationService,
    private wordService: WordService,
    private activeBook: ActiveBook,
    @Inject(MAT_DIALOG_DATA) public word: string
  ) {
  }

  ngOnInit() {
    this.translations = this.getTranslations(this.word);
    this.occurrence = this.getOccurrence(this.word);
    this.groupOccurrences = this.getGroupOccurrences(this.word);
  }

  isSelected(word: string, translation?: string): boolean {
    return this.userService.hasTranslation(word, translation);
  }

  toggleSelection(word: string, translation: string): void {
    return this.userService.hasTranslation(word, translation) ?
      this.userService.removeTranslation(word, translation) :
      this.userService.addTranslation(word, translation);
  }

  redirectTo(word: string): void {
    this.word = word;
    this.ngOnInit();
  }

  private getTranslations(word: string): string[] {
    return this.translationService.getTranslations(word);
  }

  private getOccurrence(word: string): number {
    return this.activeBook.occurrences[word] || 0;
  }

  private getGroupOccurrences(word: string): any {
    const group: string[] = this.wordService.getRelated(word);
    const groupOccurrences = {};
    group
      .filter(groupWord => this.activeBook.occurrences[groupWord])
      .forEach(groupWord => groupOccurrences[groupWord] = this.activeBook.occurrences[groupWord]);
    return groupOccurrences;
  }
}
