import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingLandingComponent } from './ranking-landing.component';

describe('RankingLandingComponent', () => {
  let component: RankingLandingComponent;
  let fixture: ComponentFixture<RankingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
