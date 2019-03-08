import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaSignupComponent } from './aca-signup.component';

describe('AcaSignupComponent', () => {
  let component: AcaSignupComponent;
  let fixture: ComponentFixture<AcaSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
