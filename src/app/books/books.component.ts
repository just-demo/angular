import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  getSavedBookIds(): string[] {
    return this.userService.getBooks();
  }
}
