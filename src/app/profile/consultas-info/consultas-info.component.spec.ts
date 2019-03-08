import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasInfoComponent } from './consultas-info.component';

describe('ConsultasInfoComponent', () => {
  let component: ConsultasInfoComponent;
  let fixture: ComponentFixture<ConsultasInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
