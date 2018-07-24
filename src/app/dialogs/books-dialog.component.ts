import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css']
})
export class BooksDialogComponent implements OnInit {
  private bookNames: string[];
  filteredBookNames: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.bookNames = this.userService.getBookNames();
    this.filteredBookNames = this.bookNames;
  }

  applyFilter(filterValue: string): void {
    const filter = filterValue.trim().toLowerCase();
    this.filteredBookNames = this.bookNames.filter(name => name.toLowerCase().startsWith(filter));
  }
}
