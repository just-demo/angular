import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() {
  }

  /**
   * Generates random values in range [0, length)
   */
  randomIntArray(size: number): number[] {
    const randomValues = [];
    console.log('Random size: ' + size);
    // const orderedValues: number[] = [...Array(size).keys()];
    const orderedValues: number[] = Array.from(Array(size).keys());
    while (orderedValues.length) {
      const i = this.randomInt(orderedValues.length);
      randomValues.push(orderedValues[i]);
      orderedValues.splice(i, 1);
    }
    return randomValues;
  }

  randomInt(limit: number): number {
    return Math.floor(Math.random() * limit);
  }
}
