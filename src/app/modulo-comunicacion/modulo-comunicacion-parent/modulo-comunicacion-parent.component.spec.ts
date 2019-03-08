import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloComunicacionParentComponent } from './modulo-comunicacion-parent.component';

describe('ModuloComunicacionParentComponent', () => {
  let component: ModuloComunicacionParentComponent;
  let fixture: ComponentFixture<ModuloComunicacionParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloComunicacionParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloComunicacionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
