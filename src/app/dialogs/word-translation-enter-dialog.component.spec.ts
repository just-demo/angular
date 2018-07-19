import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTranslationEnterDialogComponent } from './word-translation-enter-dialog.component';

describe('WordTranslationEnterDialogComponent', () => {
  let component: WordTranslationEnterDialogComponent;
  let fixture: ComponentFixture<WordTranslationEnterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordTranslationEnterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordTranslationEnterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
