import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {TranslationService} from '../services/translation.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.css']
})
export class BookStatisticsComponent implements OnInit {
  @Input() statistics: any[];
  private translations;
  private user;


  /*
        .pipe(
        switchMap(occurrences => forkJoin([
          of(occurrences),
          this.translationService.getTranslations(this.collectKeys(occurrences)),
          this.authService.isAuthenticated() ? this.userService.getUser(this.authService.getAuthUser()) : of({})
        ])),
        map(results => {
          const occurrences = results[0];
          const translations = results[1];
          const user = results[2];
          const groups = [];
          for (const occurrence of occurrences) {
            const group = {};
            let groupOccurrence = 0;
            for (const word in occurrence) {
              groupOccurrence += occurrence[word];
              group[word] = {
                occurrence: occurrence[word],
                translations: translations[word],
                translation: (user.translations || {})[word],
                selected: (user.selected || []).includes(word),
                ignored: (user.ignored || []).includes(word),
              };
            }
            groups.push(group);
          }

          return groups;
        })
      ).subscribe(data => {

   */

  // statisticsGroups;

  constructor(public translationService: TranslationService) {
  }

  ngOnInit() {
    console.log('Statistics:');
    console.log(this.statistics);
    // this.translations = this.translationService.getTranslations()
    // this.user = this.authService.isAuthenticated() ?
    // for (const group of this.statistics) {
    //   for (const word of)
    // }
  }

  getTranslations(word: string): string[] {
    return
  }


  /*
this.userService.getUserId()
  .switchMap(userResult =>
    this.userService.getUserPermission(userResult.id)
    .switchMap(permissionsResult =>
      this.userService.getUserInfo(userResult.id)
        .map(infoResult => ({
          id: userResult.id,
          name: userResult.name,
          permissions: permissionsResult.permissions,
          info: infoResult.info
        }))
    )
  )
  .subscribe(v => console.log('switchmap:', v));
   */

  private collectKeys(objects: any[]): any[] {
    const keys = [];
    for (const obj of objects) {
      keys.push(...Object.keys(obj));
    }
    return keys;
  }

}
