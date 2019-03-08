import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPagosComponent } from './empty-pagos.component';

describe('EmptyPagosComponent', () => {
  let component: EmptyPagosComponent;
  let fixture: ComponentFixture<EmptyPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
