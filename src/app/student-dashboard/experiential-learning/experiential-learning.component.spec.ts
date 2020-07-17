import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperientialLearningComponent } from './experiential-learning.component';

describe('ExperientialLearningComponent', () => {
  let component: ExperientialLearningComponent;
  let fixture: ComponentFixture<ExperientialLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperientialLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperientialLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
