import {Component, Input, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-upload-book',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css']
})
export class BookUploadComponent implements OnInit {
  statistics: Object;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
  }

  ngOnInit() {
  }

  upload(files: FileList) {
    this.bookService.submitAsFile(files.item(0)).subscribe(data => {
      // this.router.navigate(['statistics', {foo: 'foo'}], {relativeTo: this.route.parent});
      this.statistics = data;

      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }
}
