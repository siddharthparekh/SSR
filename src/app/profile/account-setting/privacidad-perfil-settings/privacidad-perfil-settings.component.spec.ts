import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadPerfilSettingsComponent } from './privacidad-perfil-settings.component';

describe('PrivacidadPerfilSettingsComponent', () => {
  let component: PrivacidadPerfilSettingsComponent;
  let fixture: ComponentFixture<PrivacidadPerfilSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacidadPerfilSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacidadPerfilSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
