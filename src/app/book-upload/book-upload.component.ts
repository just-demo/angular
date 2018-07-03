import {Component, Input, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {TranslationService} from '../services/translation.service';
import {forkJoin, Observable, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css']
})
export class BookUploadComponent implements OnInit {
  statistics: Object[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private translationService: TranslationService,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.statistics = [{'test': 2},
      {'unbeknownst': 1, 'unbeknown': 1},
      {'here': 1},
      {'interesting': 1},
      {'this': 1},
      {'just': 1},
      {'is': 1},
      {'book': 1},
      {'nothing': 1}];
  }

  upload(files: FileList) {
    this.bookService.submitAsFile(files.item(0))
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
      // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent});
      this.statistics = data;

      // do something, if upload success
    }, error => {
      console.log(error);
    });
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
