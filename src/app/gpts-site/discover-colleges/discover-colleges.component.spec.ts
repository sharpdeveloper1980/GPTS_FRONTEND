import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverCollegesComponent } from './discover-colleges.component';

describe('DiscoverCollegesComponent', () => {
  let component: DiscoverCollegesComponent;
  let fixture: ComponentFixture<DiscoverCollegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverCollegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverCollegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
