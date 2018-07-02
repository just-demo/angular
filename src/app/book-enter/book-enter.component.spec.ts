import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEnterComponent } from './book-enter.component';

describe('BookEnterComponent', () => {
  let component: BookEnterComponent;
  let fixture: ComponentFixture<BookEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
