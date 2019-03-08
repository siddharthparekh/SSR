import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSentenciasComponent } from './admin-sentencias.component';

describe('AdminSentenciasComponent', () => {
  let component: AdminSentenciasComponent;
  let fixture: ComponentFixture<AdminSentenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSentenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSentenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
