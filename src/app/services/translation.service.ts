import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = {};

  constructor(private http: HttpClient) {
    this.initTranslations();
  }

  private initTranslations(): void {
    this.translations = {
      'book': ['книга'],
      'books': ['книги']
    };
    console.log('Init translations...');
    this.http.get('/translations').subscribe(translations => {
      this.translations = translations;
      // console.log(JSON.stringify(translations));
    });
  }

  getTranslations(word: string): string[] {
    // console.log(JSON.stringify(this.translations)); /////////
    // TRANSLATIONS[word]
    return this.translations[word] || [];
  }

  getTranslation(word: string): string {
    return this.getTranslations(word)[0];
  }
}
