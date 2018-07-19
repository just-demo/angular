import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private translations = {};
  private hidden = {};
  private books: string[] = [];

  constructor(private http: HttpClient) {
  }

  syncUserData(): void {
    // TODO: load user from server
    // return this.http.get('/user/' + username);
    // TODO: flush unsaved data to server, for hidden and selected build a map with true/false values in the end
    // so that it will be clear if user wants to delete something already persisted on server
  }

  clearUserData(): void {
    this.translations = {};
    this.hidden = {};
    this.books = [];
  }

  getBooks(): string[] {
    return this.books;
  }

  addBook(name: string, text: string): void {
    // TODO: implement http request
    this.books.unshift(name);
  }

  deleteBook(bookId: string): void {
    // TODO: implement http request
    const index = this.books.indexOf(bookId);
    if (index > -1) {
      this.books.splice(index, 1);
    }
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

    return translations;
  }

  // TODO: selected instead of translation?
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

  getHidden(): string[] {
    return Object.keys(this.hidden).filter(word => this.isHidden(word));
  }

  isHidden(word: string): boolean {
    return !!this.hidden[word];
  }

  setHidden(word: string, hidden: boolean) {
    return this.hidden[word] = hidden;
  }

  private putTranslation(word: string, translation: string, status: boolean): void {
    this.translations[word] = this.translations[word] || {};
    this.translations[word][translation] = status;
  }
}
