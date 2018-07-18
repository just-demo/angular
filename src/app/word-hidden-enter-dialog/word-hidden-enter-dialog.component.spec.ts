import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordHiddenEnterDialogComponent } from './word-hidden-enter-dialog.component';

describe('WordHiddenEnterDialogComponent', () => {
  let component: WordHiddenEnterDialogComponent;
  let fixture: ComponentFixture<WordHiddenEnterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordHiddenEnterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordHiddenEnterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
