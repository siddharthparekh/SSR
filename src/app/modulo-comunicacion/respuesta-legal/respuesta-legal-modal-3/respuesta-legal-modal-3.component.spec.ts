import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaLegalModal3Component } from './respuesta-legal-modal-3.component';

describe('RespuestaLegalModal3Component', () => {
  let component: RespuestaLegalModal3Component;
  let fixture: ComponentFixture<RespuestaLegalModal3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaLegalModal3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaLegalModal3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
