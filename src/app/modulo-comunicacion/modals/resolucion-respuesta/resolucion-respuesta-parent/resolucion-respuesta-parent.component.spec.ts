import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionRespuestaParentComponent } from './resolucion-respuesta-parent.component';

describe('ResolucionRespuestaParentComponent', () => {
  let component: ResolucionRespuestaParentComponent;
  let fixture: ComponentFixture<ResolucionRespuestaParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucionRespuestaParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionRespuestaParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
