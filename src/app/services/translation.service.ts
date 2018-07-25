import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = {};

  constructor(private http: HttpClient) {
    this.http.get('/assets/translations.json').subscribe(translations => {
      this.translations = translations;
    });
  }

  getTranslations(word: string): string[] {
    return this.translations[word] || [];
  }
}
