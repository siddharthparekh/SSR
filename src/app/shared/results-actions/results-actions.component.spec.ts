import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsActionsComponent } from './results-actions.component';

describe('ResultsActionsComponent', () => {
  let component: ResultsActionsComponent;
  let fixture: ComponentFixture<ResultsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
