import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowSentenceComponent } from './modal-show-sentence.component';

describe('ModalShowSentenceComponent', () => {
  let component: ModalShowSentenceComponent;
  let fixture: ComponentFixture<ModalShowSentenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowSentenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
