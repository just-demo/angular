import {Component, HostListener, Input, OnInit} from '@angular/core';
import {min} from 'rxjs/operators';
import {WORDS} from '../stub-words';
import {TRANSLATIONS} from '../stub-translations';
import {BookDetails, BookParserService} from './book-parser.service';
import {PaginationService} from './pagination.service';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';
import {WordDialogComponent} from '../word-dialog/word-dialog.component';
import {TranslationService} from '../services/translation.service';
import {GroupService} from '../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {ActiveBook} from '../active-book';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  private bookId: string;

  private charsPerLine = 50;
  private linesPerPage = 25;
  private bookDetails: BookDetails;
  private lineIndexSelected;
  private pagination: number[][];

  constructor(private bookParserService: BookParserService,
              private paginationService: PaginationService,
              private translationService: TranslationService,
              private groupService: GroupService,
              private dialog: MatDialog,
              public activeBook: ActiveBook,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init(params['bookId'], params['pageId']);
    });
  }

  isReady(): boolean {
    return !!this.bookDetails;
  }

  private init(bookId: string, pageId: string): void {
    if (this.activeBook.id !== bookId) {
      // TODO: retrieve from database;
      this.activeBook.load(bookId, 'Book not found...');
    }

    if (this.bookId !== this.activeBook.id) {
      this.bookId = this.activeBook.id;
      this.bookDetails = this.bookParserService.parse(this.activeBook.text, this.charsPerLine);
    }

    this.setPageIndexSelected(parseInt(pageId, 10) - 1 || 0);
  }

  @HostListener('document:keydown.arrowright')
  private nextPage(): void {
    this.setPageIndexSelected(this.getPageIndexSelected() + 1);
  }

  @HostListener('document:keydown.arrowleft')
  private prevPage(): void {
    this.setPageIndexSelected(this.getPageIndexSelected() - 1);
  }

  @HostListener('document:keydown.arrowup')
  private lineUp(): void {
    // TODO: consider books/:bookId/pages/:pageId/lines/:lineId with aliases or redirects:
    // books/:bookId/pages/:pageId == books/:bookId/pages/:pageId/lines/0
    // books/:bookId == books/:bookId/pages/0
    this.setLineIndexSelected(Math.max(0, this.lineIndexSelected - 1));
  }

  @HostListener('document:keydown.arrowdown')
  private lineDown(): void {
    this.setLineIndexSelected(Math.min(this.lineIndexSelected + 1, this.bookDetails.lines.length));
  }

  getPageNavigation(): number[][] {
    return this.pagination;
  }

  // TODO: consider returning array of indexes instead of page...
  getPageSelected(): string[][] {
    return this.bookDetails.lines.slice(
      this.lineIndexSelected,
      Math.min(this.lineIndexSelected + this.linesPerPage, this.bookDetails.lines.length)
    );
  }

  isPageIndexSelected(index: number): boolean {
    return this.getPageIndexSelected() === index;
  }

  isWord(token: string): boolean {
    return this.bookDetails.words.hasOwnProperty(token);
  }

  private getPageIndexSelected(): number {
    return Math.floor(this.lineIndexSelected / this.linesPerPage);
  }

  private setPageIndexSelected(pageIndex: number): void {
    this.setLineIndexSelected(Math.min(Math.max(0, pageIndex * this.linesPerPage), this.bookDetails.lines.length - 1));
  }

  private setLineIndexSelected(lineIndex: number): void {
    this.lineIndexSelected = lineIndex;
    this.pagination = this.paginationService.paginate(this.getPagesCount(), this.getPageIndexSelected(), 9);
  }

  private getPagesCount(): number {
    return Math.ceil(this.bookDetails.lines.length / this.linesPerPage);
  }

  // getTranslationTooltip(token: string): string {
  //   // console.log('building tooltip...');
  //   const tooltipLines: string[] = [];
  //   tooltipLines.push(...this.getTranslations(token));
  //   if (tooltipLines.length === 0) {
  //     tooltipLines.push('¯\\_(ツ)_/¯');
  //   }
  //   const maxLength = tooltipLines.reduce((length, line) => Math.max(length, line.length), 0);
  //   const occurrence = this.getOccurrence(token) + '/' + this.getGroupOccurrence(token);
  //   // console.log('occurrence: ' + occurrence);
  //   tooltipLines.push('-' + this.padAround(' ' + occurrence + ' ', maxLength - 2, '-') + '-');
  //   return tooltipLines.join('\n');
  // }
  //
  // private padAround(str: string, targetLength: number, fillStr: string): string {
  //   const padStart = Math.floor((targetLength - str.length) / 2) + str.length;
  //   return str.padStart(padStart, fillStr).padEnd(targetLength, fillStr);
  // }

  private getTranslations(word: string): string[] {
    return this.translationService.getTranslations(word);
  }

  private getOccurrence(word: string): string[] {
    // const word = this.bookDetails.words[token];
    return this.bookDetails.occurrences[word] || 0;
  }

  private getGroupOccurrence(word: string): string[] {
    // const word = this.bookDetails.words[token];
    const group: string[] = this.bookDetails.groups[word] || [];
    return group.map(groupWord => this.bookDetails.occurrences[groupWord] || 0)
      .reduce((groupOccurrence, wordOccurrence) => groupOccurrence + wordOccurrence, 0);
  }

  private getGroupOccurrences(word: string): any {
    // const word = this.bookDetails.words[token];
    // const group: string[] = this.bookDetails.groups[word] || [];
    const group: string[] = this.groupService.getGroup(word);
    const groupOccurrences = {};
    group
    // not need to filter because group members are built based on real book tokens, so their appearance in the book is guaranteed
      .filter(groupWord => this.bookDetails.occurrences[groupWord])
      .forEach(groupWord => groupOccurrences[groupWord] = this.bookDetails.occurrences[groupWord]);
    // console.log('Occc:' + JSON.stringify(groupOccurrences));
    return groupOccurrences;
  }

  openWordDialog(token: string): void {
    const word = this.bookDetails.words[token];
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '250px',
      data: this.gatherDialogData(word)
    });

    dialogRef.componentInstance.redirect.subscribe(redirectWord => {
      dialogRef.componentInstance.data = this.gatherDialogData(redirectWord);
      // dialogRef.close();
      // this.openWordDialog(redirectWord);
    });
  }

  private gatherDialogData(word: string): any {
    return {
      word: word,
      translations: this.getTranslations(word),
      groupOccurrence: this.getGroupOccurrence(word),
      occurrence: this.getOccurrence(word),
      groupOccurrences: this.getGroupOccurrences(word)
    };
  }
}
