import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationConfigurarCasoComponent } from './conversation-configurar-caso.component';

describe('ConversationConfigurarCasoComponent', () => {
  let component: ConversationConfigurarCasoComponent;
  let fixture: ComponentFixture<ConversationConfigurarCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationConfigurarCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationConfigurarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
