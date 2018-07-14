import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStatisticsPaginationComponent } from './book-statistics-pagination.component';

describe('BookStatisticsPaginationComponent', () => {
  let component: BookStatisticsPaginationComponent;
  let fixture: ComponentFixture<BookStatisticsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStatisticsPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStatisticsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
