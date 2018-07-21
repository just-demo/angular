import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css']
})
export class BooksDialogComponent implements OnInit {
  private bookIds: string[];
  filteredBookIds: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.bookIds = this.userService.getBookIds();
    this.filteredBookIds = this.bookIds;
  }

  applyFilter(filterValue: string): void {
    const filter = filterValue.trim().toLowerCase();
    this.filteredBookIds = this.bookIds.filter(bookId => bookId.toLowerCase().startsWith(filter));
  }
}
