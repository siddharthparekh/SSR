import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailchimpConfirmComponent } from './mailchimp-confirm.component';

describe('MailchimpConfirmComponent', () => {
  let component: MailchimpConfirmComponent;
  let fixture: ComponentFixture<MailchimpConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailchimpConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailchimpConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
