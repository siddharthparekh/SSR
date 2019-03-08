import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSentenciasAportadasComponent } from './panel-sentencias-aportadas.component';

describe('PanelSentenciasAportadasComponent', () => {
  let component: PanelSentenciasAportadasComponent;
  let fixture: ComponentFixture<PanelSentenciasAportadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSentenciasAportadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSentenciasAportadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
