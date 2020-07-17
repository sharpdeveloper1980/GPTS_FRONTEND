import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProfilePageComponent } from './school-profile-page.component';

describe('SchoolProfilePageComponent', () => {
  let component: SchoolProfilePageComponent;
  let fixture: ComponentFixture<SchoolProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
