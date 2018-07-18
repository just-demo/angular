import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSelectedComponent } from './words-selected.component';

describe('WordsSelectedComponent', () => {
  let component: WordsSelectedComponent;
  let fixture: ComponentFixture<WordsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
