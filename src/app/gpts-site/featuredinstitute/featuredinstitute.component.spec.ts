import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedinstituteComponent } from './featuredinstitute.component';

describe('FeaturedinstituteComponent', () => {
  let component: FeaturedinstituteComponent;
  let fixture: ComponentFixture<FeaturedinstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedinstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedinstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
