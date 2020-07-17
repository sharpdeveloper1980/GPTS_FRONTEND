import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionProgressComponent } from './selection-progress.component';

describe('SelectionProgressComponent', () => {
  let component: SelectionProgressComponent;
  let fixture: ComponentFixture<SelectionProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
