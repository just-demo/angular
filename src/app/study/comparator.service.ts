import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {

  constructor() {
  }

  compare(actual: string, required: string): boolean[] {
    const matches = this.findMatches(actual, required);

    // if actual string is a substring of required one (some characters are missed at the begining or/and at the end of the string)
    if (matches.length === actual.length && actual.length !== required.length) {
      return null;
    }

    // TODO: try just Array without new
    const result = new Array(actual.length).fill(false);
    for (const i of matches) {
      result[i] = true;
    }

    return result;
  }

  private findMatches(actual: string, required: string): number[] {
    const depth = 3;
    const matches: number[] = [];
    let forceFirstActual = true;
    outerLoop:
      for (let i = 0, j = 0; i < required.length, j < actual.length; ++j) {
        for (let i2 = i; i2 < i + depth && i2 < required.length && (!forceFirstActual || i2 === i); ++i2) {
          if (actual[j] === required[i2]) {
            matches.push(j);
            i = i2 + 1;
            forceFirstActual = true;
            continue outerLoop;
          }
        }
        forceFirstActual = false;
      }
    return matches;
  }
}
