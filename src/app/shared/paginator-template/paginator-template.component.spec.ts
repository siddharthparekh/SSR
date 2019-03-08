import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorTemplateComponent } from './paginator-template.component';

describe('PaginatorTemplateComponent', () => {
  let component: PaginatorTemplateComponent;
  let fixture: ComponentFixture<PaginatorTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
