import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameLocationComponent } from './name-location.component';

describe('NameLocationComponent', () => {
  let component: NameLocationComponent;
  let fixture: ComponentFixture<NameLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
