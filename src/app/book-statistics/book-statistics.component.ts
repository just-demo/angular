import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslationService} from '../services/translation.service';
import {ActiveBook} from '../active-book';
import {KeyValue} from '../study/key-value';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.css']
})
export class BookStatisticsComponent implements OnInit {
  columns: string[] = ['index', 'word', 'translation', 'occurrence'];
  dataSource: MatTableDataSource<string[]>;
  pageSizeOptions: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private translationService: TranslationService,
    private activeBook: ActiveBook
  ) {
  }

  ngOnInit() {
    const words = this.getSortedWords();
    console.log(words);
    this.pageSizeOptions = this.getPageSizeOptions(words.length);
    this.dataSource = new MatTableDataSource<string[]>(words);
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator);
  }

  private getPageSizeOptions(length: number) {
    return Array.from(Array(Math.ceil(Math.log10(Math.max(length || 10)))).keys())
      .map(i => Math.pow(10, i + 1));
  }

  // getWords(): string[][] {
  //   return this.words;
  // }
  //
  // getWordsLimited(): string[][] {
  //   return this.words.slice(0, this.wordsLimit);
  // }

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
    Object.values(wordSortBuffer).forEach((group: KeyValue[]) => {
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

  sumOccurrence(words: string[]): number {
    return words.map(word => this.getOccurrence(word)).reduce((a, b) => a + b, 0);
  }

  getOccurrence(word: string): number {
    return this.activeBook.occurrences[word];
  }

  getTranslation(word: string): string {
    return this.translationService.getTranslation(word);
  }
}
