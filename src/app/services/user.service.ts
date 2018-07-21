import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Working data structure is optimized for performance
  private selected: { [word: string]: { [translation: string]: boolean } } = {};
  private hidden: { [word: string]: boolean } = {};
  // private books: { [bookId: string]: boolean | string } = {};
  private books: { [bookId: string]: any } = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  syncUserData(): void {
    const userPatch = {
      selected: this.getSelected(),
      hidden: this.getHidden(),
      books: this.getBooks()
    };
    this.patchUser(userPatch).subscribe(() =>
      this.readUser().subscribe(user =>
        // TODO: refresh current page to get new data displayed!
        this.copyState(user)));
  }

  clearUserData(): void {
    this.copyState({});
  }

  getBookIds(): string[] {
    return Object.keys(this.books).filter(bookId => this.books[bookId]);
  }

  getBook(bookId: string): Observable<string> {
    if (this.isBookInitialized(this.books[bookId])) {
      return of(this.books[bookId]);
    }

    if (this.books[bookId] && this.authService.isAuthenticated()) {
      const book = this.http.get<string>('/users/' + this.authService.getAuthUser() + '/books/' + bookId);
      book.subscribe(text => this.books[bookId] = text);
      return book;
    }

    return of(null);
  }

  saveBook(bookId: string, text: string): void {
    this.books[bookId] = text;
    if (this.authService.isAuthenticated()) {
      const patch = {
        books: [{
          name: bookId,
          content: text,
          language: 'en'
        }]
      };
      this.patchUser(patch);
    }
  }

  removeBook(bookId: string): void {
    this.books[bookId] = false;
    if (this.authService.isAuthenticated()) {
      const patch = {books: [{name: bookId}]};
      this.patchUserRemove(patch);
    }
  }

  getSelected(): { en: string, ru: string }[] {
    const selected = [];
    Object.keys(this.selected).forEach(word =>
      Object.keys(this.selected[word])
        .filter(translation => this.selected[word][translation])
        .forEach(translation => selected.push({en: word, ru: translation})));
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
      const patch = {hidden: [word]};
      hidden ? this.patchUser(patch) : this.patchUserRemove(patch);
    }
  }

  private readUser(): Observable<any> {
    // No need to subscribe since this is a read operation
    return this.http.get<any>('/users/' + this.authService.getAuthUser());
  }

  private patchUser(userPatch: any): Observable<any> {
    const response = this.http.patch<any>('/users/' + this.authService.getAuthUser(), userPatch);
    response.subscribe();
    return response;
  }

  private patchUserRemove(userPatch: any): Observable<any> {
    const response = this.http.patch<any>('/users/' + this.authService.getAuthUser() + '/remove', userPatch);
    response.subscribe();
    return response;
  }

  private getBooks(): { name: string, content: string, language: string }[] {
    return Object.keys(this.books)
      .filter(bookId => this.isBookInitialized(this.books[bookId]))
      .map(bookId => {
        return {
          name: bookId,
          content: this.books[bookId],
          language: 'en'
        };
      });
  }

  private saveSelectedInternal(word: string, translation: string, selected: boolean): void {
    this.selected[word] = this.selected[word] || {};
    this.selected[word][translation] = selected;
    if (this.authService.isAuthenticated()) {
      const patch = {selected: [{en: word, ru: translation}]};
      selected ? this.patchUser(patch) : this.patchUserRemove(patch);
    }
  }

  private isBookInitialized(text: boolean): boolean {
    return typeof text === 'string';
  }

  private copyState(user: any): void {
    user = user || {};
    this.selected = {};
    this.hidden = {};
    this.books = {};
    (user.selected || []).forEach(selection => {
      this.selected[selection.en] = this.selected[selection.en] || {};
      this.selected[selection.en][selection.ru] = true;
    });
    (user.hidden || []).forEach(word => this.hidden[word] = true);
    (user.books || []).forEach(book => this.books[book.name] = true);
  }
}
