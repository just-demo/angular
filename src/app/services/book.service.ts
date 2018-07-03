import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  submitAsFile(book: File): Observable<any[][]> {
    const formData: FormData = new FormData();
    formData.append('file', book, book.name);
    return this.http.post('/books/upload', formData);
  }
}
