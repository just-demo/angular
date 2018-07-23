import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {KeyValue} from '../key-value';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSource = new Subject<string>();

  constructor() {
  }

  setTitle(title: string): void {
    this.titleSource.next(title);
  }

  clearTitle(): void {
    this.titleSource.next(null);
  }

  subscribeTitle(callback: (title: string) => void) {
    this.titleSource.asObservable().subscribe(title => {
      callback(title);
    });
  }
}
