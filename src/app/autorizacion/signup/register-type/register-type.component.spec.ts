import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTypeComponent } from './register-type.component';

describe('RegisterTypeComponent', () => {
  let component: RegisterTypeComponent;
  let fixture: ComponentFixture<RegisterTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
