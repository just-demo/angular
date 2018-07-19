import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../services/user.service';
import {TranslationService} from '../services/translation.service';
import {GroupService} from '../services/group.service';
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
    private groupService: GroupService,
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
    const group: string[] = this.groupService.getGroup(word);
    const groupOccurrences = {};
    group
    // no need to filter because group members are built based on real book tokens, so their appearance in the book is guaranteed
      .filter(groupWord => this.activeBook.occurrences[groupWord])
      .forEach(groupWord => groupOccurrences[groupWord] = this.activeBook.occurrences[groupWord]);
    return groupOccurrences;
  }
}
