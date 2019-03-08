import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutResolucionComponent } from './checkout-resolucion.component';

describe('CheckoutResolucionComponent', () => {
  let component: CheckoutResolucionComponent;
  let fixture: ComponentFixture<CheckoutResolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutResolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
