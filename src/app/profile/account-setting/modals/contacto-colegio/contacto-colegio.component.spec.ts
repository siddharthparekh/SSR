import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoColegioComponent } from './contacto-colegio.component';

describe('ContactoColegioComponent', () => {
  let component: ContactoColegioComponent;
  let fixture: ComponentFixture<ContactoColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
