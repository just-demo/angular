import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {
  compare(actual: string, expected: string): MatchResult {
    const result = new MatchResult(actual.split(''));
    if (actual !== expected) {
      if (expected.includes(actual)) {
        if (expected.startsWith(actual)) {
          result.missingSuffix = true;
        } else {
          result.missingPrefix = true;
          if (!expected.endsWith(actual)) {
            result.missingSuffix = true;
          }
        }
      } else {
        this.getDifference(actual, expected).forEach(charIndex => result.matches[charIndex] = false);
      }
    }
    return result;
  }

  /**
   * TODO: fix it (first character problem, e.g. getDifference('ello', 'hello') and make more readable
   * @return indexes of actual string that do not match expected ones
   */
  private getDifference(actual: string, expected: string): number[] {
    const depth = 3;
    // const matches: number[] = [];
    const difference: number[] = [];
    let forceFirstActual = true; // TODO: what it this???
    outerLoop:
      for (let i = 0, j = 0; i < expected.length, j < actual.length; ++j) {
        for (let i2 = i; i2 < i + depth && i2 < expected.length && (!forceFirstActual || i2 === i); ++i2) {
          if (actual[j] === expected[i2]) {
            // matches.push(j);
            i = i2 + 1;
            forceFirstActual = true;
            continue outerLoop;
          }
        }
        forceFirstActual = false;
        difference.push(j);
      }
    return difference;
  }
}

export class MatchResult {
  chars: string[];
  matches: boolean[];
  missingPrefix: boolean;
  missingSuffix: boolean;

  constructor(chars: string[]) {
    this.chars = chars;
    this.matches = Array(chars.length).fill(true);
    this.missingPrefix = false;
    this.missingSuffix = false;
  }
}
