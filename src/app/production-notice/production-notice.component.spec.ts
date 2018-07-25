import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionNoticeComponent } from './production-notice.component';

describe('ProductionNoticeComponent', () => {
  let component: ProductionNoticeComponent;
  let fixture: ComponentFixture<ProductionNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
