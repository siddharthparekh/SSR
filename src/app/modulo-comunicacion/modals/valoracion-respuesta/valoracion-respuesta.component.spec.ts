import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionRespuestaComponent } from './valoracion-respuesta.component';

describe('ValoracionRespuestaComponent', () => {
  let component: ValoracionRespuestaComponent;
  let fixture: ComponentFixture<ValoracionRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
