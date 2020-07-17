import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBlogComponent } from './knowledge-blog.component';

describe('KnowledgeBlogComponent', () => {
  let component: KnowledgeBlogComponent;
  let fixture: ComponentFixture<KnowledgeBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
