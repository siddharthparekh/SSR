import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaLegalComponent } from './respuesta-legal.component';

describe('RespuestaLegalComponent', () => {
  let component: RespuestaLegalComponent;
  let fixture: ComponentFixture<RespuestaLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
