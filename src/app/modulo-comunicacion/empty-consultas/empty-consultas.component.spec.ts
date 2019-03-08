import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyConsultasComponent } from './empty-consultas.component';

describe('EmptyConsultasComponent', () => {
  let component: EmptyConsultasComponent;
  let fixture: ComponentFixture<EmptyConsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyConsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
