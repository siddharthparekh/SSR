import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaLegalParentComponent } from './respuesta-legal-parent.component';

describe('RespuestaLegalParentComponent', () => {
  let component: RespuestaLegalParentComponent;
  let fixture: ComponentFixture<RespuestaLegalParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaLegalParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaLegalParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
