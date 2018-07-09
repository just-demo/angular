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
   * hello:
   *     pllo   => *llo
   *     phello => *hello
   *     heilo  => he*l* //TODO: optimize this
   * @return indexes of actual string that do not match expected ones
   */
  private getDifference(actual: string, expected: string): number[] {
    const difference = [];
    for (let a = 0, e = 0; a < actual.length; a++) {
      // If prev was matched then only current expected character (not any subsequent one) is examined
      // to make sure no missing expected character is left unnoticed.
      const prevWasDifferent = difference.length && a - difference[difference.length - 1] === 1;
      let different = true;
      for (let ee = e; ee < expected.length && different && (prevWasDifferent || ee === e); ee++) {
        if (actual[a] === expected[ee]) {
          different = false;
          e = ee + 1;
        }
      }

      if (different) {
        difference.push(a);
      }
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
