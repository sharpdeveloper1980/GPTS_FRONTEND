import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  constructor() { }

  
  ngOnInit() {
    document.body.classList.add("course-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("course-body");
  }
}
