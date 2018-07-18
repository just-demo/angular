import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsHiddenComponent } from './words-hidden.component';

describe('WordsHiddenComponent', () => {
  let component: WordsHiddenComponent;
  let fixture: ComponentFixture<WordsHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
