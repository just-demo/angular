import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() {
  }

  paginate(actualCount: number, selectedIndex: number, maxVisible: number): number[][] {
    const maxVisibleOf2 = maxVisible - 2; // -1 other and -1 delimiter
    const maxVisibleOf3 = maxVisible - 4; // -2 others and -2 delimiters
    const minPartDistance = 3;
    const minIndex = 0;
    const maxIndex = minIndex + actualCount - 1;
    if (actualCount <= maxVisible) {
      return [this.range(minIndex, actualCount)];
    }

    const minIndexCentral = selectedIndex - Math.floor(maxVisibleOf3 / 2);
    const maxIndexCentral = minIndexCentral + maxVisibleOf3 - 1;
    if (minIndexCentral - minIndex < minPartDistance) {
      return [this.range(minIndex, maxVisibleOf2), [maxIndex]];
    }

    if (maxIndex - maxIndexCentral < minPartDistance) {
      return [[minIndex], this.range(maxIndex + 1 - maxVisibleOf2, maxVisibleOf2)];
    }

    return [[minIndex], this.range(minIndexCentral, maxVisibleOf3), [maxIndex]];
  }

  private range(start: number, length: number): number[] {
    const result = [];
    const end = start + length;
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
}
