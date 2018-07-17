///<reference path="../../../node_modules/@angular/animations/src/animation_metadata.d.ts"/>
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TranslationService} from '../services/translation.service';
import {ActiveBook} from '../active-book';
import {KeyValue} from '../quiz/key-value';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {WordDialogComponent} from '../word-dialog/word-dialog.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.css']
})
export class BookStatisticsComponent implements OnInit {
  // mainColumns: string[] = ['word', 'translation', 'occurrence'];
  dataSource: MatTableDataSource<string>;
  pageSizeOptions: number[];
  showHidden = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private translationService: TranslationService,
    private userService: UserService,
    private activeBook: ActiveBook,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const words = this.getSortedWords();
    this.pageSizeOptions = this.getPageSizeOptions(words.length);
    this.dataSource = new MatTableDataSource<string>(words);
    // TODO: find a way to group related words visually
    const defaultFilterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => {
      // Trimming filter is needed here because refreshTable appends a dummy space to trigger refreshing the table
      return defaultFilterPredicate(data, filter.trim()) && (this.showHidden || !this.isHidden(data));
    };
    // console.log('Default predicate');
    // console.log(this.dataSource.filterPredicate);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  openWordDialog(word: string): void {
    this.dialog.open(WordDialogComponent, {
      width: '300px',
      data: word
    });
  }

  toggleVisibility(word: string): void {
    this.userService.setHidden(word, !this.userService.isHidden(word));
    this.refreshTable();
  }

  getOccurrence(word: string): number {
    return this.activeBook.occurrences[word];
  }

  getTranslations(word: string): string[] {
    return this.translationService.getTranslations(word);
  }

  isHidden(word: string): boolean {
    return this.userService.isHidden(word);
  }

  isSelected(word: string, translation?: string): boolean {
    return this.userService.hasTranslation(word, translation);
  }

  refreshTable() {
    // TODO: find an better way to refresh table
    this.dataSource.filter += ' ';
  }

  private getPageSizeOptions(length: number) {
    return Array.from(Array(Math.ceil(Math.log10(Math.max(length || 10)))).keys())
      .map(i => Math.pow(10, i + 1));
  }

  private getSortedWords(): string[] {
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

    const flatWords = [];
    groupSortBuffer.sort((a, b) => (a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0))
      .map(keyValue => keyValue.key)
      .forEach(words => flatWords.push(...words));
    return flatWords;
  }
}
