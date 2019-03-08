import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasLegalesComponent } from './respuestas-legales.component';

describe('RespuestasLegalesComponent', () => {
  let component: RespuestasLegalesComponent;
  let fixture: ComponentFixture<RespuestasLegalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasLegalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
