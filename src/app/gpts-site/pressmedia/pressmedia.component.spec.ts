import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressmediaComponent } from './pressmedia.component';

describe('PressmediaComponent', () => {
  let component: PressmediaComponent;
  let fixture: ComponentFixture<PressmediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressmediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
