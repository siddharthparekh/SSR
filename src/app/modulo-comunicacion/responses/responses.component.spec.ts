import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasEnviadasComponent } from './respuestas-enviadas.component';

describe('RespuestasEnviadasComponent', () => {
  let component: RespuestasEnviadasComponent;
  let fixture: ComponentFixture<RespuestasEnviadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasEnviadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
