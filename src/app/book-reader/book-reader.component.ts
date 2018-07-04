import {Component, Input, OnInit} from '@angular/core';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  @Input() book: any;
  private knownTokens: string[] = []; // TODO: implement
  tokens: string[] = [];
  words: Object = {};
  pages: string[][][];
  pageIndexSelected = 0;

  constructor() {
  }

  getPageNavigation(): number[][] {
    const maxVisible = 9;
    const maxVisibleOf2 = maxVisible - 2; // -1 other and -1 delimiter
    const maxVisibleOf3 = maxVisible - 4; // -2 others and -2 delimiters
    const minPartDistance = 3;
    const minIndex = 0;
    const actualLength = this.pages.length;
    const maxIndex = minIndex + actualLength - 1;
    if (actualLength <= maxVisible) {
      return [this.range(minIndex, actualLength)];
    }

    const minIndexCentral = this.pageIndexSelected - Math.floor(maxVisibleOf3 / 2);
    const maxIndexCentral = minIndexCentral + maxVisibleOf3 - 1;
    if (minIndexCentral - minIndex < minPartDistance) {
      return [this.range(minIndex, maxVisibleOf2), [maxIndex]];
    }

    if (maxIndex - maxIndexCentral < minPartDistance) {
      return [[minIndex], this.range(maxIndex + 1 - maxVisibleOf2, maxVisibleOf2)];
    }

    return [[minIndex], this.range(minIndexCentral, maxVisibleOf3), [maxIndex]];
  }

  private range(start: number, length: number): number[] {
    const result = [];
    const end = start + length;
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  ngOnInit() {
    for (const token of this.splitIntoTokens(this.book.text)) {
      if (this.words.hasOwnProperty(token) || !this.hasAnyLetter(token)) {
        this.tokens.push(token);
      } else {
        const reducedToken = this.reduceToken(token);
        if (reducedToken) {
          this.words[token] = reducedToken;
          this.tokens.push(token);
        } else {
          for (const subToken of this.splitIntoSubTokens(token)) {
            if (!this.words.hasOwnProperty(subToken) && this.hasAnyLetter(subToken)) {
              this.words[subToken] = this.reduceToKnownToken(subToken) || subToken;
            }
            this.tokens.push(subToken);
          }
        }
      }
    }
    this.pages = this.splitIntoPages(this.tokens);
  }

  private splitIntoPages(tokens: string[]): string[][][] {
    const pageWidth = 50;
    const pageHeight = 20;
    const pages: string[][][] = [];
    const lines = this.splitIntoLines(tokens, pageWidth);
    let page: string[][] = [];

    for (const line of lines) {
      page.push(line);
      if (page.length >= pageHeight) {
        pages.push(page);
        page = [];
      }
    }

    if (page.length > 0) {
      pages.push(page);
    }

    return pages;
  }

  private splitIntoLines(tokens: string[], lineWidth: number): string[][] {
    const lines: string[][] = [];
    let line: string[] = [];

    for (const token of tokens) {
      if (token === '\n') {
        line.push(token);
        lines.push(line);
        line = [];
      } else if (this.estimateWidth(...line, token) > lineWidth) {
        line.push('\n'); // to force line breaks on page
        lines.push(line);
        line = token === ' ' ? [] : [token]; // just one space not to mess up paragraphs, titles and so on
      } else {
        line.push(token);
      }
    }

    if (line.length > 0) {
      lines.push(line);
    }

    return lines;
  }

  private estimateWidth(...tokens: string[]): number {
    return tokens.reduce((a, b) => a + b.length, 0);
  }

  /*
  function estimateWidth(...tokens) {
    return tokens.reduce((a, b) => a + b.length, 0);
  }

  estimateWidth('aa', 'bbbb');
    estimateWidth(...['aa', 'bbbb']);
    estimateWidth(...['aa', 'bbbb'], 'cc');
   */

  isWord(token: string): boolean {
    return this.words.hasOwnProperty(token);
  }

  showTranslationTooltip(token: string): void {
    console.log(token + ' is to be translated...'); // TODO: implement
  }

  showTranslationDialog(token: string): void {
    console.log(token + ' is to be managed...'); // TODO: implement
  }

  private reduceToken(token: string): string {
    let knownToken = this.reduceToKnownToken(token);
    if (knownToken) {
      return knownToken;
    }

    if (this.hasOnlyLetters(token)) {
      return token.toLowerCase();
    }

    if (this.hasAnyDash(token)) {
      knownToken = this.reduceToKnownToken(this.removeDashes(token));
      if (knownToken) {
        return knownToken;
      }
    }

    return null;
  }

  private reduceToKnownToken(token: string): string {
    if (this.isKnown(token)) {
      return token;
    }

    token = token.toLowerCase();
    if (this.isKnown(token)) {
      return token;
    }

    token = token.charAt(0).toUpperCase() + token.slice(1);
    if (this.isKnown(token)) {
      return token;
    }

    token = token.toUpperCase();
    if (this.isKnown(token)) {
      return token;
    }

    return null;
  }

  private isKnown(token: string): boolean {
    return this.knownTokens.includes(token);
  }

  private hasAnyLetter(str: string): boolean {
    return /[a-z]/i.test(str);
  }

  private hasAnyDash(str: string): boolean {
    return /-/.test(str);
  }

  private removeDashes(str: string): string {
    return str.replace(/-/g, '');
  }


  private hasOnlyLetters(str: string): boolean {
    return !/[^a-z]/i.test(str);
  }

  private splitIntoTokens(text: string): string[] {
    const tokens = [];
    // each new line character is treated as a separate token to ease pagination
    const p = /([a-z'\-]+|[^a-z'\-\n]+|\n)/gi;
    let m;
    while (m = p.exec(text)) {
      tokens.push(m[1]);
    }
    return tokens;
  }

  private splitIntoSubTokens(text: string): string[] {
    const tokens = [];
    const p = /([a-z]+|[^a-z]+)/gi;
    let m;
    while (m = p.exec(text)) {
      tokens.push(m[1]);
    }
    return tokens;
  }
}

// export class Page {
//   constructor(
//     public first: number,
//     public last: number
//   ) {
//   }
// }
