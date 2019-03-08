import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSoybogadoEmeritaComponent } from './landing-soybogado-emerita.component';

describe('LandingSoybogadoEmeritaComponent', () => {
  let component: LandingSoybogadoEmeritaComponent;
  let fixture: ComponentFixture<LandingSoybogadoEmeritaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingSoybogadoEmeritaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSoybogadoEmeritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
