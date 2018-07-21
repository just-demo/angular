import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = {};

  // TODO: create service eagerly, otherwise first time the service is triggered translations don't have enough time to get initiated
  constructor(private http: HttpClient) {
    this.http.get('/translations').subscribe(translations => {
      this.translations = translations;
    });
  }

  getTranslations(word: string): string[] {
    return this.translations[word] || [];
  }
}
