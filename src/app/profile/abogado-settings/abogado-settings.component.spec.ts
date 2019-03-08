import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbogadoSettingsComponent } from './abogado-settings.component';

describe('AbogadoSettingsComponent', () => {
  let component: AbogadoSettingsComponent;
  let fixture: ComponentFixture<AbogadoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbogadoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbogadoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
