import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selected = {};
  private hidden = {};
  private books: string[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  syncUserData(): void {
    this.http.get<any>('/users/' + this.authService.getAuthUser(), this.getAuthOptions())
      .subscribe(user => this.copyState(user));
    // TODO: flush unsaved data to server, for hidden and selected build a map with true/false values in the end
    // so that it will be clear if user wants to delete something already persisted on server
  }

  clearUserData(): void {
    this.copyState({});
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

  putSelected(word: string, translation: string): void {
    this.setSelected(word, translation, true);
  }

  removeSelected(word: string, translation: string): void {
    this.setSelected(word, translation, false);
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

  setHidden(word: string, hidden: boolean) {
    this.hidden[word] = hidden;
    // TODO: encode values!!!
    const url = '/users/' + this.authService.getAuthUser() + '/hidden/' + word;
    hidden ?
      this.http.put(url, {}, this.getAuthOptions()).subscribe() :
      this.http.delete(url, this.getAuthOptions()).subscribe();
  }

  private setSelected(word: string, translation: string, selected: boolean): void {
    this.selected[word] = this.selected[word] || {};
    this.selected[word][translation] = selected;
    // TODO: encode values!!!
    const url = '/users/' + this.authService.getAuthUser() + '/selected/' + word + '/' + translation;
    selected ?
      this.http.put(url, {}, this.getAuthOptions()).subscribe() :
      this.http.delete(url, this.getAuthOptions()).subscribe();
  }

  private copyState(user: any): void {
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
