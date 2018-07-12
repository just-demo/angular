import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private translations = {};

  constructor(private http: HttpClient) {
  }

  getUser(username: string): Observable<Object> {
    return this.http.get('/user/' + username);
  }

  /**
   * @return {word: [translation, ...]}
   */
  getTranslations(): any {
    // TODO: find a better data structure
    const translations = {};
    Object.keys(this.translations).forEach(word => {
      Object.keys(this.translations[word]).forEach(translation => {
        if (this.translations[word][translation]) {
          translations[word] = translations[word] || [];
          translations[word].push(translation);
        }
      });
    });

    // TODO: remove hard-coded values
    if (!Object.keys(this.translations).length) {
      translations['one'] = ['один', 'адын'];
      translations['two'] = ['два'];
      translations['three'] = ['три'];
    }

    return translations;
  }

  addTranslation(word: string, translation: string): void {
    this.putTranslation(word, translation, true);
  }

  removeTranslation(word: string, translation: string): void {
    this.putTranslation(word, translation, false);
  }

  hasTranslation(word: string, translation?: string): boolean {
    return this.translations[word] && (translation === undefined ?
        Object.values(this.translations[word]).some(status => !!status) :
        this.translations[word][translation]
    );
  }

  private putTranslation(word: string, translation: string, status: boolean): void {
    this.translations[word] = this.translations[word] || {};
    this.translations[word][translation] = status;
  }
}
