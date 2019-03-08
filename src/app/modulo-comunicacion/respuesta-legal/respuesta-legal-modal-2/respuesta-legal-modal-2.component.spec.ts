import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaLegalModal2Component } from './respuesta-legal-modal-2.component';

describe('RespuestaLegalModal2Component', () => {
  let component: RespuestaLegalModal2Component;
  let fixture: ComponentFixture<RespuestaLegalModal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaLegalModal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaLegalModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
