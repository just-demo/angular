import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  @Input() text: string;
  private knownTokens: string[] = []; // TODO: implement
  tokens: string[] = [];
  words: Object = {};

  constructor() {
  }

  ngOnInit() {
    for (const token of this.splitIntoTokens(this.text)) {
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
  }

  isWord(token: string): boolean {
    return this.words.hasOwnProperty(token);
  }

  showTranslation(token: string): void {
    console.log(token + ' is to be translated...'); // TODO: implement
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
    const p = /([a-z'\-]+|[^a-z'\-]+)/gi;
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
