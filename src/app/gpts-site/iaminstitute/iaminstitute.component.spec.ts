import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IaminstituteComponent } from './iaminstitute.component';

describe('IaminstituteComponent', () => {
  let component: IaminstituteComponent;
  let fixture: ComponentFixture<IaminstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaminstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IaminstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
