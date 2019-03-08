import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionRespuestaRechazarComponent } from './resolucion-respuesta-rechazar.component';

describe('ResolucionRespuestaRechazarComponent', () => {
  let component: ResolucionRespuestaRechazarComponent;
  let fixture: ComponentFixture<ResolucionRespuestaRechazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucionRespuestaRechazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionRespuestaRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
