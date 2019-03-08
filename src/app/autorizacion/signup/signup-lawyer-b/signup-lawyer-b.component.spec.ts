import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLawyerBComponent } from './signup-lawyer-b.component';

describe('SignupLawyerBComponent', () => {
  let component: SignupLawyerBComponent;
  let fixture: ComponentFixture<SignupLawyerBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupLawyerBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLawyerBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
