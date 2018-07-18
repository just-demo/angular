import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSettingsHiddenComponent } from './quiz-settings-hidden.component';

describe('QuizSettingsHiddenComponent', () => {
  let component: QuizSettingsHiddenComponent;
  let fixture: ComponentFixture<QuizSettingsHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSettingsHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSettingsHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
