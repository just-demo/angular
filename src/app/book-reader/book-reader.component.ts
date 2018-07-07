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
    const tooltipLines: string[] = [];
    tooltipLines.push(...this.getTranslations(token));
    if (tooltipLines.length === 0) {
      tooltipLines.push('¯\\_(ツ)_/¯');
    }
    const maxLength = tooltipLines.reduce((length, line) => Math.max(length, line.length), 0);
    tooltipLines.unshift('-' + this.padAround(' ' + this.getOccurrence(token) + ' ', maxLength - 2 , '-') + '-')
    return tooltipLines.join('\n');
    // return  (translations && translations[0]) || '¯\\_(ツ)_/¯';
    // return `${token}1\n${token}2\n${token}3`; // TODO: implement
  }

  private padAround(str: string, targetLength: number, fillStr: string): string {
    const padStart = Math.floor((targetLength - str.length) / 2) + str.length;
    // console.log(typeof str);
    // console.log('====: ' + str.length);
    // console.log('Max length: ' + targetLength);
    // console.log('Pad start: ' + padStart);
    return ('' + str).padStart(padStart, fillStr).padEnd(targetLength, fillStr);
  }

  private getTranslations(token: string): string[] {
    return TRANSLATIONS[this.bookDetails.words[token]] || [];
  }

  private getOccurrence(token: string): string[] {
    return this.bookDetails.occurrences[this.bookDetails.words[token]] || 0;
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
