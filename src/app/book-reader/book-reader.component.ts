import {Component, Input, OnInit} from '@angular/core';
import {min} from 'rxjs/operators';
import {WORDS} from '../stub-words';
import {TRANSLATIONS} from '../stub-translations';
import {BookDetails, BookParserService} from './book-parser.service';
import {PaginationService} from './pagination.service';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';
import {WordDialogComponent} from '../word-dialog/word-dialog.component';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  @Input() book: any;
  private bookDetails: BookDetails;
  private pageIndexSelected = 0;

  constructor(private bookParserService: BookParserService,
              private paginationService: PaginationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.bookDetails = this.bookParserService.parse(this.book.text);
  }

  getPageNavigation(): number[][] {
    return this.paginationService.paginate(this.bookDetails.pages.length, this.pageIndexSelected, 9);
  }

  getPage(pageIndex: number): string[][] {
    return this.bookDetails.pages[pageIndex];
  }

  getPageIndexSelected(): number {
    return this.pageIndexSelected;
  }

  setPageIndexSelected(index: number): void {
    this.pageIndexSelected = index;
  }

  isPageIndexSelected(index: number): boolean {
    return this.pageIndexSelected === index;
  }

  isWord(token: string): boolean {
    return this.bookDetails.words.hasOwnProperty(token);
  }

  getTranslationTooltip(token: string): string {
    // console.log('building tooltip...');
    const tooltipLines: string[] = [];
    tooltipLines.push(...this.getTranslations(token));
    if (tooltipLines.length === 0) {
      tooltipLines.push('¯\\_(ツ)_/¯');
    }
    const maxLength = tooltipLines.reduce((length, line) => Math.max(length, line.length), 0);
    const occurrence = this.getOccurrence(token) + '/' + this.getGroupOccurrence(token);
    // console.log('occurrence: ' + occurrence);
    tooltipLines.push('-' + this.padAround(' ' + occurrence + ' ', maxLength - 2, '-') + '-');
    return tooltipLines.join('\n');
  }

  private padAround(str: string, targetLength: number, fillStr: string): string {
    const padStart = Math.floor((targetLength - str.length) / 2) + str.length;
    return str.padStart(padStart, fillStr).padEnd(targetLength, fillStr);
  }

  private getTranslations(token: string): string[] {
    return TRANSLATIONS[this.bookDetails.words[token]] || [];
  }

  private getOccurrence(token: string): string[] {
    const word = this.bookDetails.words[token];
    return this.bookDetails.occurrences[word] || 0;
  }

  private getGroupOccurrence(token: string): string[] {
    const word = this.bookDetails.words[token];
    const group: string[] = this.bookDetails.groups[word] || [];
    return group.map(groupWord => this.bookDetails.occurrences[groupWord] || 0)
      .reduce((groupOccurrence, wordOccurrence) => groupOccurrence + wordOccurrence, 0);
  }

  openWordDialog(word: string): void {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '235px',
      data: {word: word, translations: []}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog output: ' + result);
    });
  }

}
