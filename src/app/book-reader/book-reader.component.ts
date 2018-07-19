import {Component, HostListener, OnInit} from '@angular/core';
import {BookParserService} from '../services/book-parser.service';
import {PaginationService} from './pagination.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ActiveBook} from '../active-book';
import {WordTranslationViewDialogComponent} from '../dialogs/word-translation-view-dialog.component';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  private charsPerLine = 50;
  private linesPerPage = 25;
  private lineIndexSelected;
  private lines: string[][];
  private pagination: number[][];

  constructor(private bookParserService: BookParserService,
              private paginationService: PaginationService,
              private dialog: MatDialog,
              private activeBook: ActiveBook,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lines = this.bookParserService.splitIntoLines(this.activeBook.tokens, this.charsPerLine);
    this.route.params.subscribe(params => {
      this.setPageIndexSelected(parseInt(params['pageId'], 10) - 1 || 0);
    });
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
    this.setLineIndexSelected(this.lineIndexSelected - 1);
  }

  @HostListener('document:keydown.arrowdown')
  private lineDown(): void {
    this.setLineIndexSelected(this.lineIndexSelected + 1);
  }

  scrollPage(event: WheelEvent): void {
    // 100 was determined empirically
    this.setLineIndexSelected(this.lineIndexSelected + Math.ceil(event.deltaY / 100));
  }

  getPageNavigation(): number[][] {
    return this.pagination;
  }

  // TODO: consider returning array of indexes instead of page...
  getPageSelected(): string[][] {
    return this.lines.slice(
      this.lineIndexSelected,
      Math.min(this.lineIndexSelected + this.linesPerPage, this.lines.length)
    );
  }

  isPageIndexSelected(index: number): boolean {
    return this.getPageIndexSelected() === index;
  }

  isWord(token: string): boolean {
    return this.activeBook.words.hasOwnProperty(token);
  }

  private getPageIndexSelected(): number {
    return Math.floor(this.lineIndexSelected / this.linesPerPage);
  }

  private setPageIndexSelected(pageIndex: number): void {
    this.setLineIndexSelected(pageIndex * this.linesPerPage);
  }

  private setLineIndexSelected(lineIndex: number): void {
    this.lineIndexSelected = Math.min(Math.max(0, lineIndex), this.lines.length - 1);
    this.pagination = this.paginationService.paginate(this.getPagesCount(), this.getPageIndexSelected(), 9);
  }

  private getPagesCount(): number {
    return Math.ceil(this.lines.length / this.linesPerPage);
  }

  openWordDialog(token: string): void {
    this.dialog.open(WordTranslationViewDialogComponent, {
      width: '300px',
      data: this.activeBook.words[token]
    });
  }
}
