import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career-library-course-profile',
  templateUrl: './career-library-course-profile.component.html',
  styleUrls: ['./career-library-course-profile.component.scss']
})
export class CareerLibraryCourseProfileComponent implements OnInit {

  config: any;
  constructor() {
    this.config = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }

  ngOnInit() {
    document.body.classList.add("careerlibraryBody");
  }

  ngOnDestroy() {
    document.body.classList.remove("careerlibraryBody");
  }

}
