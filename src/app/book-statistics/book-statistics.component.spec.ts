import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStatisticsComponent } from './book-statistics.component';

describe('BookStatisticsComponent', () => {
  let component: BookStatisticsComponent;
  let fixture: ComponentFixture<BookStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
