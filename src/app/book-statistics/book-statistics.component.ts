import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslationService} from '../services/translation.service';
import {ActiveBook} from '../active-book';
import {KeyValue} from '../quiz/key-value';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';
import {PaginationHelperService} from '../services/pagination-helper.service';
import {WordTranslationViewDialogComponent} from '../dialogs/word-translation-view-dialog.component';
import {WordService} from '../services/word.service';

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
  @ViewChild(MatSort) sort: MatSort; // TODO: still needed?

  constructor(
    private translationService: TranslationService,
    private userService: UserService,
    private wordService: WordService,
    private activeBook: ActiveBook,
    private dialog: MatDialog,
    private paginationHelperService: PaginationHelperService
  ) {
  }

  ngOnInit() {
    const words = this.getSortedWords();
    this.pageSizeOptions = this.paginationHelperService.getPageSizeOptions(words.length);
    this.dataSource = new MatTableDataSource<string>(words);
    // TODO: find a way to group related words visually
    const defaultFilterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => {
      // Trimming filter is needed here because refreshTable appends a dummy space to trigger refreshing the table
      return defaultFilterPredicate(data, filter.trim()) && (this.showHidden || !this.isHidden(data));
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  openWordDialog(word: string): void {
    this.dialog.open(WordTranslationViewDialogComponent, {
      width: '300px',
      data: word
    });
  }

  toggleVisibility(word: string): void {
    this.userService.saveHidden(word, !this.userService.isHidden(word));
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
    return this.userService.isSelected(word, translation);
  }

  refreshTable() {
    // TODO: find an better way to refresh table
    this.dataSource.filter += ' ';
  }

  private getSortedWords(): string[] {
    const wordSortBuffer = {};
    Object.keys(this.activeBook.occurrences).forEach(word => {
      const groupId = this.wordService.getRelated(word)[0];
      if (!wordSortBuffer[groupId]) {
        wordSortBuffer[groupId] = [];
      }
      wordSortBuffer[groupId].push(new KeyValue(word, this.activeBook.occurrences[word]));
    });

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
