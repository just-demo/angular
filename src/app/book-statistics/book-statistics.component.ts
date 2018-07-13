import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TranslationService} from '../services/translation.service';
import {UserService} from '../services/user.service';
import {ActiveBook} from '../active-book';
import {KeyValue} from '../study/key-value';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.css']
})
export class BookStatisticsComponent implements OnInit {
  private wordsLimit = 100;
  private words: string[][];

  constructor(
    private translationService: TranslationService,
    private activeBook: ActiveBook
  ) {
  }

  ngOnInit() {
    this.words = this.getSortedWords();
  }

  getWordsLimited(): string[][] {
    return this.words.slice(0, this.wordsLimit);
  }

  private getSortedWords(): string[][] {
    const wordSortBuffer = {};
    for (const word in this.activeBook.occurrences) {
      const groupId = this.activeBook.groups[word][0];
      if (!wordSortBuffer[groupId]) {
        wordSortBuffer[groupId] = [];
      }
      wordSortBuffer[groupId].push(new KeyValue(word, this.activeBook.occurrences[word]));
    }

    const groupSortBuffer = [];
    Object.values(wordSortBuffer).forEach(group => {
      groupSortBuffer.push(new KeyValue(
        group.sort((a, b) => (a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0))
          .map(keyValue => keyValue.key),
        group.map(keyValue => keyValue.value)
          .reduce((a, b) => a + b, 0)
      ));
    });

    return groupSortBuffer.sort((a, b) => (a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0))
      .map(keyValue => keyValue.key);
  }

  getOccurrence(word: string): number {
    return this.activeBook.occurrences[word];
  }

  getTranslation(word: string): string {
    return this.translationService.getTranslation(word);
  }
}
