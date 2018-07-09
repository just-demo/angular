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
      // If prev was matched then current actual character should match current expected character (not any subsequent one) in order to be
      // treated as matched, otherwise a missing expected character could be left undetected.
      const prevWasDifferent = (difference.length && a - difference[difference.length - 1] === 1);
      const eeLimit = prevWasDifferent || e === expected.length ? expected.length : e + 1;
      let ee = e;
      while (ee < eeLimit && actual[a] !== expected[ee]) {
        ee++;
      }

      if (ee < eeLimit) {
        e = ee + 1;
      } else {
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
