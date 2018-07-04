import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
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
  book = {
    text: null
  };

  constructor(
    private zone: NgZone,
    // private changeDetector: ChangeDetectorRef,
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

  upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.zone.run(() => {
        this.book.text = reader.result;
      });
      // console.log(this.book.text);
      // this.changeDetector.detectChanges();
    };
    reader.readAsText(file);

    // this.bookService.submitAsFile(file)
    //   .subscribe(data => {
    //   // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent});
    //   this.statistics = data;
    //
    //   // do something, if upload success
    // }, error => {
    //   console.log(error);
    // });
  }
}
