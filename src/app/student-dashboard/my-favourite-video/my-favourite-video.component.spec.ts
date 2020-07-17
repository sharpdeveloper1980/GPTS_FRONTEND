import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavouriteVideoComponent } from './my-favourite-video.component';

describe('MyFavouriteVideoComponent', () => {
  let component: MyFavouriteVideoComponent;
  let fixture: ComponentFixture<MyFavouriteVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavouriteVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavouriteVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
