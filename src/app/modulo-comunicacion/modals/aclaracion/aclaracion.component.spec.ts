import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclaracionComponent } from './aclaracion.component';

describe('AclaracionComponent', () => {
  let component: AclaracionComponent;
  let fixture: ComponentFixture<AclaracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AclaracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
