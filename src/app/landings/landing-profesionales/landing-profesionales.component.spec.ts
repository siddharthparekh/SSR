import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProfesionalesComponent } from './landing-profesionales.component';

describe('LandingProfesionalesComponent', () => {
  let component: LandingProfesionalesComponent;
  let fixture: ComponentFixture<LandingProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
