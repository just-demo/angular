import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Working data structure is optimized for performance
  private selected: { [word: string]: { [translation: string]: boolean } } = {};
  private hidden: { [word: string]: boolean } = {};
  // private books: { [name: string]: boolean | string } = {};
  private books: { [name: string]: any } = {};

  constructor(
    private router: Router,
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
      this.readUser().subscribe(user => {
          this.copyState(user);
          this.router.navigate([this.router.url]);
        }
      ));
  }

  clearUserData(): void {
    this.copyState({});
  }

  getBookNames(): string[] {
    return Object.keys(this.books).filter(name => this.books[name]);
  }

  getBook(name: string): Observable<string> {
    if (this.isBookInitialized(this.books[name])) {
      return of(this.books[name]);
    }

    if (this.books[name] && this.authService.isAuthenticated()) {
      const book = this.http.get<string>('/users/' + this.authService.getAuthUser() + '/books/' + name);
      book.subscribe(content => this.books[name] = content);
      return book;
    }

    return of(null);
  }

  saveBook(name: string, content: string): Observable<any> {
    this.books[name] = content;
    if (this.authService.isAuthenticated()) {
      const patch = {
        books: [{
          name: name,
          content: content,
          language: 'en'
        }]
      };
      this.patchUser(patch).subscribe();
    }
  }

  removeBook(name: string): void {
    this.books[name] = false;
    if (this.authService.isAuthenticated()) {
      const patch = {books: [{name: name}]};
      this.patchUserRemove(patch).subscribe();
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
      hidden ? this.patchUser(patch).subscribe() : this.patchUserRemove(patch).subscribe();
    }
  }

  private readUser(): Observable<any> {
    // No need to subscribe since this is a read operation
    return this.http.get<any>('/users/' + this.authService.getAuthUser());
  }

  private patchUser(userPatch: any): Observable<any> {
    return this.http.patch<any>('/users/' + this.authService.getAuthUser(), userPatch);
  }

  private patchUserRemove(userPatch: any): Observable<any> {
    return this.http.patch<any>('/users/' + this.authService.getAuthUser() + '/remove', userPatch);
  }

  private getBooks(): { name: string, content: string, language: string }[] {
    return Object.keys(this.books)
      .filter(name => this.isBookInitialized(this.books[name]))
      .map(name => {
        return {
          name: name,
          content: this.books[name],
          language: 'en'
        };
      });
  }

  private saveSelectedInternal(word: string, translation: string, selected: boolean): void {
    this.selected[word] = this.selected[word] || {};
    this.selected[word][translation] = selected;
    if (this.authService.isAuthenticated()) {
      const patch = {selected: [{en: word, ru: translation}]};
      selected ? this.patchUser(patch).subscribe() : this.patchUserRemove(patch).subscribe();
    }
  }

  private isBookInitialized(content: boolean): boolean {
    return typeof content === 'string';
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
