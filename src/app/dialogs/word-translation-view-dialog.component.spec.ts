import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WordTranslationViewDialogComponent} from './word-translation-view-dialog.component';

describe('WordTranslationViewDialogComponent', () => {
  let component: WordTranslationViewDialogComponent;
  let fixture: ComponentFixture<WordTranslationViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordTranslationViewDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordTranslationViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
