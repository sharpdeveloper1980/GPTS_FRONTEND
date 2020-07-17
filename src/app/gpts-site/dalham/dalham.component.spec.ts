import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DalhamComponent } from './dalham.component';

describe('DalhamComponent', () => {
  let component: DalhamComponent;
  let fixture: ComponentFixture<DalhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DalhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DalhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
