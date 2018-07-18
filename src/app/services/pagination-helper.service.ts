import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationHelperService {
  getPageSizeOptions(length: number) {
    return Array.from(Array(Math.ceil(Math.log10(Math.max(length || 10)))).keys())
      .map(i => Math.pow(10, i + 1));
  }
}
