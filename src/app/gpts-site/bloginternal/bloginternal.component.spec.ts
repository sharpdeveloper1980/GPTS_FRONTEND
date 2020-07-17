import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloginternalComponent } from './bloginternal.component';

describe('BloginternalComponent', () => {
  let component: BloginternalComponent;
  let fixture: ComponentFixture<BloginternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloginternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloginternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
