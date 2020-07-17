import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavVideosUpComponent } from './my-fav-videos-up.component';

describe('MyFavVideosUpComponent', () => {
  let component: MyFavVideosUpComponent;
  let fixture: ComponentFixture<MyFavVideosUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavVideosUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavVideosUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
