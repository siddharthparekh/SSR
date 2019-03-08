import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAñadirSentenciasComponent } from './panel-añadir-sentencias.component';

describe('PanelAñadirSentenciasComponent', () => {
  let component: PanelAñadirSentenciasComponent;
  let fixture: ComponentFixture<PanelAñadirSentenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAñadirSentenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAñadirSentenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
