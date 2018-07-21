import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.css']
})
export class BooksDialogComponent implements OnInit {
  private bookIds: string[];
  filteredBookIds: string[];

  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<AppComponent>
  ) {
  }

  redirectTo(bookId: string): void {
    this.dialogRef.close(bookId);
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
