import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAbogadosComponent } from './mis-abogados.component';

describe('MisAbogadosComponent', () => {
  let component: MisAbogadosComponent;
  let fixture: ComponentFixture<MisAbogadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAbogadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
