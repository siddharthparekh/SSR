import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationDefaultComponent } from './conversation-default.component';

describe('ConversationDefaultComponent', () => {
  let component: ConversationDefaultComponent;
  let fixture: ComponentFixture<ConversationDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
