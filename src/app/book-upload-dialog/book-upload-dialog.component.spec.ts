import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUploadDialogComponent } from './book-upload-dialog.component';

describe('BookUploadDialogComponent', () => {
  let component: BookUploadDialogComponent;
  let fixture: ComponentFixture<BookUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
