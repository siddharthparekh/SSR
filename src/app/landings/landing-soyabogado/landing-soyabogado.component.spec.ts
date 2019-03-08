import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSoyabogadoComponent } from './landing-soyabogado.component';

describe('LandingSoyabogadoComponent', () => {
  let component: LandingSoyabogadoComponent;
  let fixture: ComponentFixture<LandingSoyabogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingSoyabogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSoyabogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
