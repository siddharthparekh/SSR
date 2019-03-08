import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFacturasComponent } from './empty-facturas.component';

describe('EmptyFacturasComponent', () => {
  let component: EmptyFacturasComponent;
  let fixture: ComponentFixture<EmptyFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
