import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDerechosComponent } from './modal-derechos.component';

describe('ModalDerechosComponent', () => {
  let component: ModalDerechosComponent;
  let fixture: ComponentFixture<ModalDerechosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDerechosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
