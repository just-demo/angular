import {Injectable} from '@angular/core';
import {BookParserService} from '../services/book-parser.service';

@Injectable()
export class ActiveBook {
  id: string;
  tokens: string[];
  words: any;
  groups: any;
  occurrences: any;

  constructor(private bookParserService: BookParserService) {
    this.clear();
  }

  clear(): void {
    this.id = null;
    this.copyState({});
  }

  load(id: string, text: string): void {
    const parseResult = this.bookParserService.parse(text);
    this.copyState(parseResult);
    this.id = id;
  }

  isLoaded(): boolean {
    return !!this.id;
  }

  private copyState(data: any): void {
    this.words = data.words || {};
    this.occurrences = data.occurrences || {};
    this.tokens = data.tokens || [];
  }
}
