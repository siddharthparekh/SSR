import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaLegalModal1Component } from './respuesta-legal-modal-1.component';

describe('RespuestaLegalModal1Component', () => {
  let component: RespuestaLegalModal1Component;
  let fixture: ComponentFixture<RespuestaLegalModal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaLegalModal1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaLegalModal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
