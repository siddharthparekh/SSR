import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExplicacionComponent } from './modal-explicacion.component';

describe('ModalExplicacionComponent', () => {
  let component: ModalExplicacionComponent;
  let fixture: ComponentFixture<ModalExplicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExplicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
