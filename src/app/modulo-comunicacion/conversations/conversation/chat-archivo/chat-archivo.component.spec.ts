import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatArchivoComponent } from './chat-archivo.component';

describe('ChatArchivoComponent', () => {
  let component: ChatArchivoComponent;
  let fixture: ComponentFixture<ChatArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
