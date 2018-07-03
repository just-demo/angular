import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) {
  }

  getTranslations(words: string[]): Observable {
    return this.http.post('/translations', words);
  }
}
