import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSettingsSelectedComponent } from './quiz-settings-selected.component';

describe('QuizSettingsSelectedComponent', () => {
  let component: QuizSettingsSelectedComponent;
  let fixture: ComponentFixture<QuizSettingsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSettingsSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSettingsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
