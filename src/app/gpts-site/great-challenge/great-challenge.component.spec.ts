import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatChallengeComponent } from './great-challenge.component';

describe('GreatChallengeComponent', () => {
  let component: GreatChallengeComponent;
  let fixture: ComponentFixture<GreatChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
