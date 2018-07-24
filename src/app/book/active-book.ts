import {Injectable} from '@angular/core';
import {BookParserService} from '../services/book-parser.service';

@Injectable()
export class ActiveBook {
  name: string;
  tokens: string[];
  words: any;
  groups: any;
  occurrences: any;

  constructor(private bookParserService: BookParserService) {
    this.clear();
  }

  clear(): void {
    this.name = null;
    this.copyState({});
  }

  load(id: string, text: string): void {
    const parseResult = this.bookParserService.parse(text);
    this.copyState(parseResult);
    this.name = id;
  }

  isLoaded(): boolean {
    return !!this.name;
  }

  private copyState(data: any): void {
    this.words = data.words || {};
    this.occurrences = data.occurrences || {};
    this.tokens = data.tokens || [];
  }
}
