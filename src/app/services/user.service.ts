import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selected = {};
  private hidden = {};
  private books: { [bookId: string]: boolean | string } = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  syncUserData(): void {
    const url = '/users/' + this.authService.getAuthUser();
    const userPatch = {
      selected: this.getSelected(),
      hidden: this.getHidden(),
      books: this.getBooks()
    };
    this.http.patch(url, userPatch, this.getAuthOptions())
    // TODO: refresh current page to get new data displayed!
      .subscribe(user => this.copyState(user));
  }

  clearUserData(): void {
    this.copyState({});
  }

  getBookIds(): string[] {
    return Object.keys(this.books).filter(bookId => this.books[bookId]);
  }

  saveBook(bookId: string, text: string): void {
    this.books[bookId] = text;
    if (this.authService.isAuthenticated()) {
      // TODO: encode values!!!
      const url = '/users/' + this.authService.getAuthUser() + '/books/' + bookId;
      this.http.put(url, text, this.getAuthOptions()).subscribe();
    }
  }

  removeBook(bookId: string): void {
    this.books[bookId] = false;
    if (this.authService.isAuthenticated()) {
      // TODO: encode values!!!
      const url = '/users/' + this.authService.getAuthUser() + '/books/' + bookId;
      this.http.delete(url, this.getAuthOptions()).subscribe();
    }
  }

  /**
   * @return {word: [translation, ...]}
   */
  getSelected(): any {
    const selected = {};
    Object.keys(this.selected).forEach(word => {
      Object.keys(this.selected[word]).forEach(translation => {
        if (this.selected[word][translation]) {
          selected[word] = selected[word] || [];
          selected[word].push(translation);
        }
      });
    });
    return selected;
  }

  saveSelected(word: string, translation: string): void {
    this.saveSelectedInternal(word, translation, true);
  }

  removeSelected(word: string, translation: string): void {
    this.saveSelectedInternal(word, translation, false);
  }

  isSelected(word: string, translation?: string): boolean {
    return this.selected[word] && (translation === undefined ?
        Object.values(this.selected[word]).some(status => !!status) :
        this.selected[word][translation]
    );
  }

  getHidden(): string[] {
    return Object.keys(this.hidden).filter(word => this.isHidden(word));
  }

  isHidden(word: string): boolean {
    return !!this.hidden[word];
  }

  saveHidden(word: string, hidden: boolean) {
    this.hidden[word] = hidden;
    if (this.authService.isAuthenticated()) {
      // TODO: encode values!!!
      const url = '/users/' + this.authService.getAuthUser() + '/hidden/' + word;
      hidden ?
        this.http.put(url, {}, this.getAuthOptions()).subscribe() :
        this.http.delete(url, this.getAuthOptions()).subscribe();
    }
  }

  private getBooks(): { [bookId: string]: string } {
    const books = {};
    Object.keys(this.books)
      .filter(bookId => typeof this.books[bookId] === 'string')
      .forEach(bookId => books[bookId] = this.books[bookId]);
    return books;
  }

  private saveSelectedInternal(word: string, translation: string, selected: boolean): void {
    this.selected[word] = this.selected[word] || {};
    this.selected[word][translation] = selected;
    if (this.authService.isAuthenticated()) {
      // TODO: encode values!!!
      const url = '/users/' + this.authService.getAuthUser() + '/selected/' + word + '/' + translation;
      selected ?
        this.http.put(url, {}, this.getAuthOptions()).subscribe() :
        this.http.delete(url, this.getAuthOptions()).subscribe();
    }
  }

  private copyState(user: any): void {
    user = user || {};
    this.selected = {};
    this.hidden = {};
    Object.keys(user.selected || {}).forEach(word => {
      this.selected[word] = this.selected[word] || {};
      user.selected[word].forEach(translation => this.selected[word][translation] = true);
    });
    Object.keys(user.hidden || {}).forEach(word => this.hidden[word] = true);
    this.books = user.books || [];
  }

  private getAuthOptions() {
    return {headers: this.authService.getAuthHeaders()};
  }
}
