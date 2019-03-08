import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarCertificateBotonComponent } from './entrar-certificate-boton.component';

describe('EntrarCertificateBotonComponent', () => {
  let component: EntrarCertificateBotonComponent;
  let fixture: ComponentFixture<EntrarCertificateBotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrarCertificateBotonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrarCertificateBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
