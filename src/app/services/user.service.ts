import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selection = {};

  constructor(private http: HttpClient) {
  }

  getUser(username: string): Observable<Object> {
    return this.http.get('/user/' + username);
  }

  getSelection(): any {
    // TODO: find a better data structure
    const selection = {};
    Object.keys(this.selection).forEach(word => {
      Object.keys(this.selection[word]).forEach(translation => {
        if (this.selection[word][translation]) {
          selection[word] = selection[word] || {};
          selection[word][translation] = true;
        }
      });
    });
    return selection;
  }

  setSelected(word: string, translation: string, selected: boolean): void {
    this.selection[word] = this.selection[word] || {};
    this.selection[word][translation] = selected;
  }

  isSelected(word: string, translation?: string): boolean {
    return this.selection[word] && (translation === undefined ?
        Object.values(this.selection[word]).some(selected => selected) :
        this.selection[word][translation]
    );
  }
}
