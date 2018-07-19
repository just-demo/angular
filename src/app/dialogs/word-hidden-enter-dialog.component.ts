import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GroupService} from '../services/group.service';

@Component({
  selector: 'app-word-hidden-enter-dialog',
  templateUrl: './word-hidden-enter-dialog.component.html'
})
export class WordHiddenEnterDialogComponent implements OnInit {
  word = new FormControl('', [Validators.required]);
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.options = this.groupService.getWords().sort();
    this.filteredOptions = this.word.valueChanges.pipe(
      // startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().startsWith(filterValue)).slice(0, 5);
  }
}
