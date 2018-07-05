import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) {
  }

  getTranslations(words: string): Observable<Object> {
    return this.http.post('/translations', words);
  }

  getTranslation(word: string): Observable<Object> {
    return this.http.post('/translations', null);
  }
}
