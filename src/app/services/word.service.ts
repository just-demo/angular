import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private relatedWords = {};

  constructor(private http: HttpClient) {
    this.http.get<string[][]>('/assets/words.json').subscribe(words => {
      words.forEach(relatedWords => relatedWords.forEach(word => this.relatedWords[word] = relatedWords));
    });
  }

  getRelated(word: string): string[] {
    return this.relatedWords[word] || [word];
  }

  getWords(): string[] {
    return Object.keys(this.relatedWords);
  }
}
