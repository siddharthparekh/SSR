import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProximamenteComponent } from './empty-proximamente.component';

describe('EmptyProximamenteComponent', () => {
  let component: EmptyProximamenteComponent;
  let fixture: ComponentFixture<EmptyProximamenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyProximamenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyProximamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
