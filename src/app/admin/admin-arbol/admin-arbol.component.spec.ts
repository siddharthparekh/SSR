import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArbolComponent } from './admin-arbol.component';

describe('AdminArbolComponent', () => {
  let component: AdminArbolComponent;
  let fixture: ComponentFixture<AdminArbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
