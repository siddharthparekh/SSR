import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondionesProfesionalesComponent } from './condiones-profesionales.component';

describe('CondionesProfesionalesComponent', () => {
  let component: CondionesProfesionalesComponent;
  let fixture: ComponentFixture<CondionesProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondionesProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondionesProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
