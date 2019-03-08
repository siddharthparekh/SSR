import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeticionProfesionalComponent } from './modal-peticion-profesional.component';

describe('ModalPeticionProfesionalComponent', () => {
  let component: ModalPeticionProfesionalComponent;
  let fixture: ComponentFixture<ModalPeticionProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPeticionProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPeticionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
