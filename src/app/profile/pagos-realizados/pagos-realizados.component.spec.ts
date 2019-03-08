import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosRealizadosComponent } from './pagos-realizados.component';

describe('PagosRealizadosComponent', () => {
  let component: PagosRealizadosComponent;
  let fixture: ComponentFixture<PagosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
